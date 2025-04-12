package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) throws IOException {
        Conexao conexao = new Conexao();

        JdbcTemplate template = new JdbcTemplate(conexao.getConexao());

        //String nomeArquivo = "leitor-excel/Dados_PI_99Bairros.xlsx";
        String nomeArquivo = "leitor-excel/SPDadosCriminais_2025.xlsx";

        // Carregando o arquivo excel
        Path caminho = Path.of(nomeArquivo);
        System.out.println(caminho.toAbsolutePath());

        InputStream arquivo = Files.newInputStream(caminho);

        // Extraindo os livros do arquivo
        LeitorExcel leitorExcel = new LeitorExcel();
        List<Dado> dadosExtraidos = leitorExcel.extrairDados(nomeArquivo, arquivo, 0);

        // Fechando o arquivo após a extração
        arquivo.close();

        System.out.println("Dados extraídos:");
        for (Dado dado : dadosExtraidos) {
            System.out.println(dado.toString());
        }

        System.out.println("Inserindo dados no banco...");
        for (Dado dado : dadosExtraidos) {
            template.update("INSERT INTO dado (rubrica, latitude, longitude, data_hora_crime, bairro, regiao) VALUES (?, ?, ?, ?, ?, ?)",
                    dado.getRubrica(), dado.getLatitude(), dado.getLongitude(), dado.getDataHoraCrime(), dado.getBairro(), dado.getRegiao());
        }
    }
}