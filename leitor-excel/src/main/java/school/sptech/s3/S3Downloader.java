package school.sptech.s3;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.ResponseTransformer;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

import java.io.InputStream;

public class S3Downloader {

    private final S3Client s3Client;

    public S3Downloader(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public InputStream baixarArquivo(String bucketName, String objectKey) {
        GetObjectRequest request = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(objectKey)
                .build();

        ResponseInputStream<GetObjectResponse> response = s3Client.getObject(request, ResponseTransformer.toInputStream());

        return response; // você já pode usar esse InputStream com o Apache POI!
    }
}
