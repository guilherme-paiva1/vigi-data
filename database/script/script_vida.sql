CREATE DATABASE IF NOT EXISTS vida;

USE vida;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    matricula VARCHAR(7),
    perfil VARCHAR(8),
    superior INT,
    email VARCHAR(45),
    senha VARCHAR(45)
);

CREATE TABLE dado (
    idDado INT PRIMARY KEY AUTO_INCREMENT,
    rubrica VARCHAR(45),
    regiao VARCHAR(10),
    bairro VARCHAR(70),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(10, 8),
    data_hora_crime DATETIME
);