package school.sptech.mensageria;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SingleColumnRowMapper;

import java.util.List;

public class Alerta {

    public void enviarAlertaSucesso(JdbcTemplate template, String mensagem) {
        template.update("INSERT INTO alerta (titulo, descricao, tipo) values (?, ?, ?)", "Sucesso!", mensagem, "informativa");

        List<Integer> idsDelegados = template.query(
                "SELECT idUsuario FROM usuario WHERE perfil = 'delegado'",
                new SingleColumnRowMapper<>(Integer.class)
        );

        Integer idAlerta = template.queryForObject(
                "SELECT idAlerta FROM alerta WHERE titulo = 'Sucesso!' AND descricao = '" + mensagem + "' AND tipo = 'informativa'",
                Integer.class
        );

        for (Integer idsDelegado : idsDelegados) {
            template.update("INSERT INTO notificacao (fkAlerta, fkUsuario, visualizado) values (?, ?, ?)", idAlerta, idsDelegado, 0);
        }
    }

    public void enviarAlertaFalha(JdbcTemplate template, String mensagem) {
        template.update("INSERT INTO alerta (titulo, descricao, tipo) values (?, ?, ?)", "Erro ao acessar arquivos", mensagem, "urgente");

        List<Integer> idsDelegados = template.query(
                "SELECT idUsuario FROM usuario WHERE perfil = 'delegado'",
                new BeanPropertyRowMapper<>(Integer.class)
        );

        Integer idAlerta = template.query(
                "SELECT idAlerta FROM alerta WHERE titulo = 'Erro ao acessar arquivos' AND mensagem = '" + mensagem + "' AND tipo = 'urgente'",
                new BeanPropertyRowMapper<>(Integer.class)
        ).get(0);

        for (Integer idsDelegado : idsDelegados) {
            template.update("INSERT INTO notificacao (fkAlerta, fkUsuario, visualizado) values (?, ?, ?)", idAlerta, idsDelegado, 0);
        }
    }
}
