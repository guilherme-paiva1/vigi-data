package school.sptech;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class LeitorExcel {

    public List<Dado> extrairDados(String nomeArquivo, InputStream arquivo) {
        try {
            IOUtils.setByteArrayMaxOverride(500000000);
            System.out.printf("\nIniciando leitura do arquivo %s\n%n", nomeArquivo);

            // Criando um objeto Workbook a partir do arquivo recebido
            Workbook workbook = new XSSFWorkbook(arquivo);

            Sheet sheet = workbook.getSheetAt(0);

            List<Dado> dadosExtraidos = new ArrayList<>();

            // Iterando sobre as linhas da planilha
            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    System.out.println("\nLendo cabeçalho");
                    continue;
                }

                Cell celulaRubrica = row.getCell(20);
                Cell celulaLatitude  = row.getCell(14);
                Cell celulaLongitude = row.getCell(15);
                Cell celulaData = row.getCell(7);
                Cell celulaHorario = row.getCell(8);

                String valorCelulaRubrica = getCellValue(celulaRubrica);
                String valorCelulaLatitude = getCellValue(celulaLatitude);
                String valorCelulaLongitude = getCellValue(celulaLongitude);
                String valorCelulaData = getCellValue(celulaData);
                String valorCelulaHorario = getCellValue(celulaHorario);

                Boolean latLongStringInvalidas =
                                valorCelulaLatitude.equals("NULL") ||
                                valorCelulaLatitude.equals("0") ||
                                valorCelulaLongitude.equals("NULL") ||
                                valorCelulaLongitude.equals("0");

                if (latLongStringInvalidas) continue;

                Boolean dataHoraInvalidas =
                                valorCelulaData.equals("NULL") ||
                                valorCelulaHorario.equals("NULL");

                Double latitudeTratada = Double.valueOf(valorCelulaLatitude);
                Double longitudeTratada = Double.valueOf(valorCelulaLongitude);

                Boolean latLongInvalidas = latitudeTratada == 0d || longitudeTratada == 0d;

                if (latLongInvalidas || dataHoraInvalidas) {
                    continue;
                }

                LocalDateTime dataHoraTratada = converterDate(valorCelulaData, valorCelulaHorario);

                if (valorCelulaRubrica != null && !valorCelulaRubrica.isEmpty() && dataHoraTratada != null ) {
                    Dado dado = new Dado(valorCelulaRubrica, latitudeTratada, longitudeTratada, dataHoraTratada);
                    dadosExtraidos.add(dado);
                }

            }

            // Fechando o workbook após a leitura
            workbook.close();

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
