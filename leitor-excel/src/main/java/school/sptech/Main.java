package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import java.io.IOException;
import software.amazon.awssdk.services.s3.S3Client;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        try {
            Conexao conexao = new Conexao();
            JdbcTemplate template = conexao.getTemplate();
            Connection conn = conexao.getConnection();
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
            List<Ocorrencia> ocorrencias = leitorExcel.extrairOcorrencias(objectKey, arquivo, 0);

            // Inserindo os dados extraídos no Banco
            System.out.println("Inserindo as ocorrencias extraídas do S3 no Banco de dadoss:");
            for (Ocorrencia ocorrencia : ocorrencias) {
            template.update("INSERT INTO ocorrencia (rubrica, latitude, longitude, data_hora_crime, bairro, regiao) VALUES (?, ?, ?, ?, ?, ?)",
                    ocorrencia.getRubrica(), ocorrencia.getLatitude(), ocorrencia.getLongitude(), ocorrencia.getDataHoraCrime(), ocorrencia.getBairro(), ocorrencia.getRegiao());
        }

            // Fechar o stream após uso
            arquivo.close();
            // Commitar as alterações
            conn.commit();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
