package school.sptech.mensageria;

import org.json.JSONObject;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Slack {
    // cliente HTTP que vai realizarm as requisições e obter as respostas
    private static HttpClient client = HttpClient.newHttpClient();

    private static final String URL = "https://hooks.slack.com/services/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";

    public static void sendMessage(JSONObject content) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder(
                URI.create(URL))
                .header("accept","application/json")
                .POST(HttpRequest.BodyPublishers.ofString(content.toString()))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.printf("Status: %s%n", response.statusCode());
        System.out.printf("Response: %s%n", response.body());

    }

}
