CREATE DATABASE IF NOT EXISTS vida;
USE vida;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    fkSupervisor INT NULL,
    nome VARCHAR(45),
    matricula VARCHAR(7),
    perfil VARCHAR(8),
    email VARCHAR(45),
    senha VARCHAR(45),
    ativo TINYINT,

    CONSTRAINT fk_usuario_supervisor 
        FOREIGN KEY (fkSupervisor)
        REFERENCES usuario(idUsuario)
        ON DELETE SET NULL
);

CREATE TABLE regiao (
    idRegiao INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(6),
    populacao INT
);

CREATE TABLE ocorrencia (
    idOcorrencia INT PRIMARY KEY AUTO_INCREMENT,
    rubrica VARCHAR(45),
    bairro VARCHAR(70),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(10, 8),
    data_hora_crime DATETIME,
    fkRegiao INT,

    CONSTRAINT fk_ocorr_regiao
        FOREIGN KEY (fkRegiao)
        REFERENCES regiao(idRegiao)
        ON DELETE SET NULL
);

CREATE TABLE alerta (
    idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    dtHoraAlerta DATETIME DEFAULT CURRENT_TIMESTAMP,
    titulo VARCHAR(45),
    descricao VARCHAR(100),
    tipo VARCHAR(45),
    fkCriador INT NULL,

    CONSTRAINT fk_alerta_criador
        FOREIGN KEY (fkCriador)
        REFERENCES usuario(idUsuario)
        ON DELETE SET NULL
);

CREATE TABLE notificacao (
    idNotificacao INT PRIMARY KEY AUTO_INCREMENT,
    fkAlerta INT,
    fkUsuario INT NULL,
    visualizado TINYINT,

    CONSTRAINT fk_alerta_not
        FOREIGN KEY (fkAlerta)
        REFERENCES alerta(idAlerta)
        ON DELETE CASCADE,

    CONSTRAINT fk_usuario_not
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(idUsuario)
        ON DELETE SET NULL
);

CREATE TABLE investigacao (
    idInvestigacao INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(45),
    descricao VARCHAR(255),
    localidade VARCHAR(45),
    dt_investigacao DATE,
    status_atual VARCHAR(15),
    fkRegiao INT,

    CONSTRAINT fk_inv_regiao
        FOREIGN KEY (fkRegiao)
        REFERENCES regiao(idRegiao)
        ON DELETE SET NULL
) AUTO_INCREMENT=100;

CREATE TABLE historico_investigacao (
    fkInvestigacao INT,
    fkUsuario INT NULL,
    criador TINYINT,

    CONSTRAINT fk_inv_hist
        FOREIGN KEY (fkInvestigacao)
        REFERENCES investigacao(idInvestigacao)
        ON DELETE CASCADE,

    CONSTRAINT fk_usuario_hist
        FOREIGN KEY (fkUsuario)
        REFERENCES usuario(idUsuario)
        ON DELETE SET NULL
);

CREATE TABLE log (
    idLog INT PRIMARY KEY AUTO_INCREMENT,
    dataHora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    mensagem VARCHAR(255),
    categoria VARCHAR(7)
);
