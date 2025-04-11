package school.sptech;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Dado {

    private String rubrica;
    private Double latitude;
    private Double longitude;
    private LocalDateTime dataHoraCrime;
    private String bairro;
    private String regiao;

    public Dado() {
    }

    public Dado(String rubrica, Double latitude, Double longitude, LocalDateTime dataHoraCrime, String bairro, String regiao) {
        this.rubrica = rubrica;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dataHoraCrime = dataHoraCrime;
        this.bairro = bairro;
        this.regiao = regiao;
    }

    @Override
    public String toString() {
        return "Dado{" +
                "rubrica='" + rubrica + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", dataHoraCrime=" + dataHoraCrime +
                ", bairro=" + bairro +
                ", regiao=" + regiao +
                '}';
    }
}
