package school.sptech;

import org.json.JSONObject;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import java.io.IOException;

import school.sptech.exceptions.*;
import school.sptech.s3.*;
import school.sptech.slack.*;
import software.amazon.awssdk.services.s3.S3Client;
import java.io.InputStream;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class Main {
    public static void main(String[] args) throws SQLException, IOException, InterruptedException {
        try {
            System.out.println("Estabelecendo conexão com o Banco de Dados...");
            Conexao conexao = new Conexao();
            Connection conn = conexao.criarConexao(conexao);
            JdbcTemplate template = conexao.criarTemplate(conexao);

            JSONObject msg_json = new JSONObject();

            System.out.println("Conexão bem sucedida!");
            // Nome do bucket e do arquivo
            System.out.println("Estabelecendo conexão com o Bucket S3...");
            String bucketName = "s3-vida";
            String[] objectKeys = {"SPDadosCriminais_2025.xlsx", "Dados_PI_99Bairros.xlsx", "Dados_PI_99Bairros.xlsx"};

            // Criando cliente S3
            S3Provider provider = new S3Provider();
            S3Client s3Client = provider.getS3Client();
            System.out.println("Conexão com o bucket S3 bem sucedida!");

            // Fazendo o download dos arquivos com o InputStream
            System.out.println("Iniciando download dos arquivos na S3...");
            S3Downloader downloader = new S3Downloader(s3Client);
            List<InputStream> arquivos = new ArrayList<>();

            for (String objectKey : objectKeys) {
                arquivos.add(downloader.baixarArquivo(bucketName, objectKey));
            }
            System.out.println("Download dos arquivos bem sucedido!");

            // Extração dos dados via Apache POI
            System.out.println("Iniciando extração dos dados nos arquivos...");
            LeitorExcel leitorExcel = new LeitorExcel();
            List<Ocorrencia> ocorrencias = new ArrayList<>();
            Integer pagina = 0;
            for (int i = 0; i < arquivos.size(); i++) {
                if (i == 2) pagina = 1;
                ocorrencias.addAll(leitorExcel.extrairOcorrencias(objectKeys[i], arquivos.get(i), pagina));
            }

            System.out.println("Extração bem sucedida!");
            System.out.println("Quantidade de dados extraídos:" + ocorrencias.size());

            // validar se qtd de dados extraidos eh igual qtd do banco
            Integer totalOcorrencias = template.queryForObject(
                    "SELECT count(*) FROM ocorrencia",
                    Integer.class
            );

            if (totalOcorrencias == null) totalOcorrencias = 0;

            if (ocorrencias.size() == totalOcorrencias) {
                throw new SemNovasOcorrenciasException();
            }

            // Inserindo os dados extraídos no Banco
            System.out.println("Inserindo as ocorrências extraídas do S3 no Banco de dados...");
            for (Ocorrencia ocorrencia : ocorrencias) {
            template.update("INSERT INTO ocorrencia (rubrica, latitude, longitude, data_hora_crime, bairro, fkRegiao) VALUES (?, ?, ?, ?, ?, ?)",
                    ocorrencia.getRubrica(), ocorrencia.getLatitude(), ocorrencia.getLongitude(), ocorrencia.getDataHoraCrime(), ocorrencia.getBairro(), ocorrencia.getRegiao());
            }

            String mensagem = "Extração finalizada, " + ocorrencias.size() + " ocorrências registradas";

            template.update("INSERT INTO log (mensagem, categoria) values (?, ?)", mensagem, "sucesso");
            template.update("INSERT INTO alerta (titulo, descricao, tipo) values (?, ?, ?)", "Sucesso!", mensagem, "informativa");

            List<Integer> idsDelegados = template.query(
                    "SELECT idUsuario FROM usuario WHERE perfil = 'delegado'",
                    new BeanPropertyRowMapper<>(Integer.class)
            );

            Integer idAlerta = template.queryForObject(
                    "SELECT idAlerta FROM alerta WHERE titulo = 'Sucesso!' AND mensagem = '" + mensagem + "' AND tipo = 'informativa'",
                    Integer.class
            );

            for (Integer idsDelegado : idsDelegados) {
                template.update("INSERT INTO notificacao (fkAlerta, fkUsuario, visualizado) values (?, ?, ?)", idAlerta, idsDelegado, 0);
            }

            msg_json.put("text", mensagem);
            Slack.sendMessage(msg_json);

            // Commitar as alterações
            conn.commit();
            System.out.println("Inserção no banco de dados realizada com sucesso!");


            // Fechar os streams após uso
            for (InputStream arquivo : arquivos) {
                arquivo.close();
            }


            System.out.println("Finalizando processo. Status: Sucesso.");

        } catch (SQLException e) {
            JSONObject msg_json = new JSONObject();

            System.out.println("Conexão com o banco de dados falhou!");
            System.out.println("Finalizando processo. Status: Erro.");
            System.out.println(e.getMessage());

            msg_json.put("text", "Erro de conexão com o banco de dados, entre em contato conosco.");
            Slack.sendMessage(msg_json);

        } catch (IOException e) {
            Conexao conexao = new Conexao();
            JdbcTemplate template = conexao.criarTemplate(conexao);
            Connection conn = conexao.criarConexao(conexao);

            JSONObject msg_json = new JSONObject();

            String mensagem = "Erro ao acessar os arquivos! Finalizando processo. Status: Erro. " + e.getMessage();
            template.update("INSERT INTO log (mensagem, categoria) values (?, ?)", mensagem, "erro");
            template.update("INSERT INTO alerta (titulo, descricao, tipo) values (?, ?)", "Erro ao acessar arquivos", mensagem, "urgente");

            msg_json.put("text", mensagem);
            Slack.sendMessage(msg_json);

            conn.commit();
            System.out.println(mensagem);
        } catch (SemNovasOcorrenciasException e) {
            Conexao conexao = new Conexao();
            JdbcTemplate template = conexao.criarTemplate(conexao);
            Connection conn = conexao.criarConexao(conexao);

            String mensagem = e.getMessage();
            template.update("INSERT INTO log (mensagem, categoria) values (?, ?)", mensagem, "sucesso");

            conn.commit();
            System.out.println(mensagem);
        }
    }
}
