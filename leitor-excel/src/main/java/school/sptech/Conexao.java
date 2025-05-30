package school.sptech;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexao {
    private Connection conn;
    private JdbcTemplate template;

    public Conexao() throws SQLException, UnknownHostException {
        String dbHost = System.getenv("MYSQL_HOST");
        String dbUser = System.getenv("MYSQL_USER");
        String dbPass = System.getenv("MYSQL_PASSWORD");

        System.out.println("Host: " + dbHost);
        System.out.println("User: " + dbUser);
        System.out.println("Pass: " + dbPass);

        conn = DriverManager.getConnection(
                "jdbc:mysql://" + dbHost + ":3306/vida",
                dbUser,
                dbPass
        );

        conn.setAutoCommit(false);
        SingleConnectionDataSource scds = new SingleConnectionDataSource(conn, true);
        template = new JdbcTemplate(scds);
    }

    public JdbcTemplate criarTemplate(Conexao conexao) throws SQLException {
        JdbcTemplate template = conexao.getTemplate();
        return template;
    }

    public Connection criarConexao(Conexao conexao) {
        Connection conn = conexao.getConnection();
        return conn;
    }

    public JdbcTemplate getTemplate() {
        return template;
    }

    public Connection getConnection() {
        return conn;
    }
}
