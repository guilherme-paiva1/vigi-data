package school.sptech;

import java.time.LocalDateTime;

public class Ocorrencia {

    private String rubrica;
    private Double latitude;
    private Double longitude;
    private LocalDateTime dataHoraCrime;
    private String bairro;
    private Integer regiao;

    public Ocorrencia() {
    }

    public Ocorrencia(String rubrica, Double latitude, Double longitude, LocalDateTime dataHoraCrime, String bairro, Integer regiao) {
        this.rubrica = rubrica;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dataHoraCrime = dataHoraCrime;
        this.bairro = bairro;
        this.regiao = regiao;
    }

    public String getRubrica() {
        return rubrica;
    }

    public void setRubrica(String rubrica) {
        this.rubrica = rubrica;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public LocalDateTime getDataHoraCrime() {
        return dataHoraCrime;
    }

    public void setDataHoraCrime(LocalDateTime dataHoraCrime) {
        this.dataHoraCrime = dataHoraCrime;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public Integer getRegiao() {
        return regiao;
    }

    public void setRegiao(Integer regiao) {
        this.regiao = regiao;
    }

    @Override
    public String toString() {
        return "Ocorrencia{" +
                "rubrica='" + rubrica + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", dataHoraCrime=" + dataHoraCrime +
                ", bairro=" + bairro +
                ", regiao=" + regiao +
                '}';
    }
}
