package school.sptech.s3;

import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;

public class S3Provider {

    private final AwsCredentialsProvider credentialsProvider;

    public S3Provider() {
        this.credentialsProvider = DefaultCredentialsProvider.create();
    }

    public S3Client getS3Client() {
        return S3Client.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(credentialsProvider)
                .serviceConfiguration(S3Configuration.builder().build())
                .build();
    }
}

