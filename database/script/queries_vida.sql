INSERT INTO Usuario (nome, email, matricula, perfil, superior, senha) VALUES
	('Paulo Roberto', 'paulo@gmail.com', '1234567', 'delegado', 1, '123');
    
SELECT u.id_usuario, u.nome, u.email, u.matricula, u.perfil, s.nome 
            FROM Usuario AS u
            JOIN Usuario AS s
                WHERE u.matricula = '1234567' AND u.senha = '123';