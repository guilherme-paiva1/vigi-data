package school.sptech;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class LeitorExcel {
    public List<Ocorrencia> extrairOcorrencias(String nomeArquivo, InputStream arquivo, Integer pagina) {

        try {
            IOUtils.setByteArrayMaxOverride(500000000);
            System.out.printf("\nIniciando leitura do arquivo %s\n%n", nomeArquivo);

            Integer indexData = 0;
            Integer indexHorario = 1;
            Integer indexBairro = 2;
            Integer indexLatitude = 3;
            Integer indexLongitude = 4;
            Integer indexRubrica = 5;
            Integer indexRegiao = 6;


            List<String> listaRubricasValidas = Arrays.asList("furto", "roubo", "tráfico drogas");
            List<String> listaRegioesValidas = Arrays.asList("norte", "oeste", "leste", "sul", "centro");


            // Criando um objeto Workbook a partir do arquivo recebido
            Workbook workbook = new XSSFWorkbook(arquivo);

            Sheet sheet = workbook.getSheetAt(pagina);

            List<Ocorrencia> dadosExtraidos = new ArrayList<>();

            // Iterando sobre as linhas da planilha
            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    System.out.println("\nLendo cabeçalho");
                    continue;
                }

                if (row.getRowNum() == 167868) {
                    System.out.println("Linha com valor de bairro quebrado");
                }
                if (row.getRowNum() == 1) {
                    System.out.println("Linha com valor de bairro correto");
                }

                Cell celulaRubrica = row.getCell(indexRubrica);
                Cell celulaLatitude  = row.getCell(indexLatitude);
                Cell celulaLongitude = row.getCell(indexLongitude);
                Cell celulaData = row.getCell(indexData);
                Cell celulaHorario = row.getCell(indexHorario);
                Cell celulaBairro = row.getCell(indexBairro);
                Cell celulaRegiao = row.getCell(indexRegiao);

                String valorCelulaRubrica = getCellValue(celulaRubrica);
                String valorCelulaLatitude = getCellValue(celulaLatitude);
                String valorCelulaLongitude = getCellValue(celulaLongitude);
                String valorCelulaData = getCellValue(celulaData);
                String valorCelulaHorario = getCellValue(celulaHorario);
                String valorcelulaBairro = getCellValue(celulaBairro);
                String valorcelulaRegiao = getCellValue(celulaRegiao);

                // Recupera o nome do crime, limpa os espaços vazios nele e leva tudo pra lowercase
                String rubricaTratada = valorCelulaRubrica.split("\\(")[0].trim().toLowerCase();

                Boolean rubricaInvalida = !listaRubricasValidas.contains(rubricaTratada);

                if (rubricaInvalida) continue;

                Boolean latLongStringInvalidas =
                                valorCelulaLatitude.equals("NULL") ||
                                valorCelulaLatitude.equals("0") ||
                                valorCelulaLongitude.equals("NULL") ||
                                valorCelulaLongitude.equals("0");

                if (latLongStringInvalidas) continue;

                Boolean dataHoraInvalidas =
                                valorCelulaData.equals("NULL") ||
                                valorCelulaHorario.equals("NULL");

                if (dataHoraInvalidas) continue;

                String bairroTratado = valorcelulaBairro.toLowerCase();

                String regiaoTratada = valorcelulaRegiao.toLowerCase();
                Integer idRegiao;
                switch (regiaoTratada) {
                    case "norte" -> idRegiao = 1;
                    case "oeste" -> idRegiao = 2;
                    case "leste" -> idRegiao = 3;
                    case "centro" -> idRegiao = 4;
                    case "sul" -> idRegiao = 5;
                    case null, default -> idRegiao = null;
                }
                Boolean regiaoInvalida = !listaRegioesValidas.contains(regiaoTratada);

                if (regiaoInvalida) continue;

                Double latitudeTratada = Double.valueOf(valorCelulaLatitude);
                Double longitudeTratada = Double.valueOf(valorCelulaLongitude);

                Boolean latLongInvalidas = latitudeTratada == 0d || longitudeTratada == 0d;

                if (latLongInvalidas) continue;

                LocalDateTime dataHoraTratada = converterDate(valorCelulaData, valorCelulaHorario);

                if (dataHoraTratada != null ) {
                    Ocorrencia ocorrencia = new Ocorrencia(rubricaTratada, latitudeTratada, longitudeTratada, dataHoraTratada, bairroTratado, idRegiao);
                    dadosExtraidos.add(ocorrencia);
                }
            }

            System.out.println("\nLeitura do arquivo finalizada\n");

            return dadosExtraidos;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private LocalDateTime converterDate(String date, String time) {
        SimpleDateFormat formato = new SimpleDateFormat("dd/MM/yyyy");
        try {
            Date data = formato.parse(date);
            LocalDate localDate = data.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            LocalTime localTime = LocalTime.parse(time);

            return LocalDateTime.of(localDate, localTime);
        } catch (ParseException e) {
            System.out.println("Erro no parsing da data:" + e.getMessage());
        } catch (Exception e) {
            System.out.println("Erro ao processar o horário: " + e.getMessage());
        }

        return null;
    }

    private String getCellValue(Cell cell) {
        if (cell == null) {
            return ""; // Retorna string vazia se a célula for nula
        }

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    Date dateValue = cell.getDateCellValue();

                    // Verifica o formato da célula para distinguir entre data e horário
                    String format = cell.getCellStyle().getDataFormatString();

                    if (format.contains(":")) {
                        // Se o formato contém ":", provavelmente é um horário
                        return new SimpleDateFormat("HH:mm:ss").format(dateValue);
                    } else {
                        // Se não contém ":", trata como data completa
                        return new SimpleDateFormat("dd/MM/yyyy").format(dateValue);
                    }
                } else {
                    return String.valueOf(cell.getNumericCellValue()); // Número normal
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            case BLANK:
                return "";
            default:
                return "Valor inválido";
        }
    }
}
