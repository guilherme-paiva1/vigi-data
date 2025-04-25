package school.sptech;

public class SemNovasOcorrenciasException extends Exception {
    public SemNovasOcorrenciasException() {
        super("Sem novas ocorrências a serem registradas. Status: Sucesso, sem alterações. ");
    }
}
