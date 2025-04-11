package school.sptech;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) throws IOException {
        String nomeArquivo = "leitor-excel/Dados_PI_99Bairros.xlsx";
        // String nomeArquivo = "SPDadosCriminais_2025.xlsx";

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
    }
}