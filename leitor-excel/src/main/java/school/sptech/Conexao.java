package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {
    private Connection conn;
    private JdbcTemplate template;

    public Conexao() throws SQLException {
        conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/vida",
                "svc_vida",
                "urubu100"
        );

        conn.setAutoCommit(false);
        SingleConnectionDataSource scds = new SingleConnectionDataSource(conn, true);
        template = new JdbcTemplate(scds);
    }

    public JdbcTemplate getTemplate() {
        return template;
    }

    public Connection getConnection() {
        return conn;
    }
}
