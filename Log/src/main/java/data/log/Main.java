package data.log;

public class Main {
    public static void main(String[] args) {
        Controlador controlador = new Controlador();

        controlador.exibirExtracao();
        controlador.exibirLogs();
        controlador.encerrarExtracao();
    }
}
