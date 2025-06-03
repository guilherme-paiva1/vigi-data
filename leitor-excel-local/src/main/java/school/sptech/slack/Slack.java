package school.sptech.slack;

import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Slack {
    // cliente HTTP que vai realizar as requisições e obter as respostas
    private static HttpClient client = HttpClient.newHttpClient();

    private static final String URL = "https://hooks.slack.com/services/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";

    public static void sendMessage(JSONObject content) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(
                URI.create(URL))
                .header("accept","application/json")
                .POST(HttpRequest.BodyPublishers.ofString(content.toString()))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.printf("SLACK:");
        System.out.printf("Status: %s%n", response.statusCode());
        System.out.printf("Response: %s%n", response.body());

    }

}
