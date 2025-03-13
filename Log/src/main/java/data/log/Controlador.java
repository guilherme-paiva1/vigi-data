package data.log;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;

public class Controlador {
    void exibirExtracao() {
        System.out.println("Iniciando extração do arquivo SP_DadosCriminais-2024...");

        try {
            String[] loadingChars = {"/", "--", "\\", "|"};
            int i = 0;
            while (i < 20) {
                System.out.print("\r" + loadingChars[i % loadingChars.length]);
                i++;
                Thread.sleep(200);
            }
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("\r");
    }

    void exibirLogs() {
        System.out.println("Registro dos 10 crimes mais recentes:");
        System.out.println("-".repeat(30));
        for (int i = 0; i < 11; i++) {
            String crime;
            Integer aleatorio = ThreadLocalRandom.current().nextInt(0, 4);
            switch (aleatorio){
                case 0 -> crime = "Assalto";
                case 1 -> crime = "Homicídio";
                case 2 -> crime = "Latrocínio";
                default -> crime = "Furto";
            }

            ZonedDateTime now = ZonedDateTime.now().minusDays(i);
            DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
            String dataFormatada = now.format(formatador);

            System.out.println("Data e hora do crime: " + dataFormatada);
            System.out.println("Crime cometido: " + crime);
            System.out.println("-".repeat(30));
        }
    }

    void encerrarExtracao() {
        System.out.println("Extração concluída com sucesso!");
        System.out.println("Encerrando funcionamento.");
    }
}
