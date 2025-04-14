package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import java.io.IOException;
import software.amazon.awssdk.services.s3.S3Client;
import java.io.InputStream;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        Conexao conexao = new Conexao();
        JdbcTemplate template = new JdbcTemplate(conexao.getConexao());
        try {
            // Nome do bucket e do arquivo
            String bucketName = "test-vida";
            String objectKey = "SPDadosCriminais_2025.xlsx";

            // Criando cliente S3
            S3Provider provider = new S3Provider();
            S3Client s3Client = provider.getS3Client();

            // Fazendo o download do arquivo como InputStream
            S3Downloader downloader = new S3Downloader(s3Client);
            InputStream arquivo = downloader.baixarArquivo(bucketName, objectKey);

            // Extração dos dados via Apache POI
            LeitorExcel leitorExcel = new LeitorExcel();
            List<Dado> dados = leitorExcel.extrairDados(objectKey, arquivo, 0);

            // Inserindo os dados extraídos no Banco
            System.out.println("Inserindo os dados extraídos do S3 no Banco de Dados:");
            for (Dado dado : dados) {
            template.update("INSERT INTO dado (rubrica, latitude, longitude, data_hora_crime, bairro, regiao) VALUES (?, ?, ?, ?, ?, ?)",
                    dado.getRubrica(), dado.getLatitude(), dado.getLongitude(), dado.getDataHoraCrime(), dado.getBairro(), dado.getRegiao());
        }

            // Fechar o stream após uso
            arquivo.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
