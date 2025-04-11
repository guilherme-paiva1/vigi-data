package school.sptech;

import software.amazon.awssdk.services.s3.S3Client;

import java.io.InputStream;
import java.util.List;

public class Main {

    public static void main(String[] args) {
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

            // Exibir os dados extraídos
            System.out.println("Dados extraídos do S3:");
            for (Dado dado : dados) {
                System.out.println(dado);
            }

            // Fechar o stream após uso
            arquivo.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
