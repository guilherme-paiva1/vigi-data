INSERT INTO Usuario (nome, email, matricula, perfil, fkSupervisor, senha) VALUES
	('Paulo Roberto', 'paulo@gmail.com', '1234567', 'delegado', 1, '123');
    
INSERT INTO Usuario (nome, email, matricula, perfil, fkSupervisor, senha) VALUES
	('João Paulo', 'joao@gmail.com', '7654321', 'policial', 1, '123');
    

SELECT u.idUsuario, u.nome, u.email, u.matricula, u.perfil, s.nome AS superior
            FROM Usuario AS u
            JOIN Usuario AS s 
            ON u.fkSupervisor = s.idUsuario
                WHERE u.matricula = '7654321' AND u.senha = '123';


INSERT INTO regiao (nome, populacao) VALUES 
	("Norte", 2208963),
	("Oeste", 3991262),
	("Leste", 2208963),
	("Centro", 423536),
	("Sul", 3735554);
    