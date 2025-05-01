CREATE DATABASE IF NOT EXISTS vida;

USE vida;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    fkSupervisor INT,
    nome VARCHAR(45),
    matricula VARCHAR(7),
    perfil VARCHAR(8),
    email VARCHAR(45),
    senha VARCHAR(45),
    
    CONSTRAINT fk_usuario_supervisor 
		FOREIGN KEY (fkSupervisor)
			REFERENCES usuario(idUsuario)
);

CREATE TABLE ocorrencia (
    idOcorrencia INT PRIMARY KEY AUTO_INCREMENT,
    rubrica VARCHAR(45),
    regiao VARCHAR(10),
    bairro VARCHAR(70),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(10, 8),
    data_hora_crime DATETIME
);

CREATE TABLE alerta (
	idAlerta INT PRIMARY KEY,
    dtHoraAlerta DATETIME,
    titulo VARCHAR(45),
    conteudo VARCHAR(100),
    categoria VARCHAR(45)
);

CREATE TABLE notificacao (
	idNotificacao INT PRIMARY KEY,
    fkAlerta INT,
    fkUsuario INT,
    visualizado TINYINT,
    
    CONSTRAINT fk_alerta_not
		FOREIGN KEY (fkAlerta)
			REFERENCES alerta(idAlerta),
		
	CONSTRAINT fk_usuario_not
		FOREIGN KEY (fkUsuario)
			REFERENCES usuario(idUsuario)
);

CREATE TABLE requisicao (
	idRequisicao INT PRIMARY KEY,
    titulo VARCHAR(45),
    descricao VARCHAR(45),
    localidade VARCHAR(45),
    dt_requisicao DATE,
    status_atual VARCHAR(45),
    risco VARCHAR(45),
    progresso INT,
    ativo TINYINT
);

CREATE TABLE historico_requisicao (
	fkRequisicao INT,
    fkUsuario INT,
    criador TINYINT,
    
    CONSTRAINT fk_req_hist
		FOREIGN KEY (fkRequisicao)
			REFERENCES requisicao(idRequisicao),
		
	CONSTRAINT fk_usuario_hist
		FOREIGN KEY (fkUsuario)
			REFERENCES usuario(idUsuario)
);

CREATE TABLE log (
    idLog INT PRIMARY KEY AUTO_INCREMENT,
    dataHora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    mensagem VARCHAR(255),
    categoria VARCHAR(7)
);

CREATE TABLE regiao (
	idRegiao INT PRIMARY KEY auto_increment,
    nome VARCHAR(6),
    populacao INT
);

