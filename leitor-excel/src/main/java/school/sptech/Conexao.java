package school.sptech;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

public class Conexao {
    private DataSource conexao;

    public Conexao() {
        DriverManagerDataSource driver = new DriverManagerDataSource();

        driver.setDriverClassName("com.mysql.cj.jdbc.Driver");
        driver.setUsername("svc_vida");
        driver.setPassword("urubu100");
        driver.setUrl("jdbc:mysql://localhost:3306/vida");

        this.conexao = driver;
    }

    public DataSource getConexao() {
        return this.conexao;
    }
}
