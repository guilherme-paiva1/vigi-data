CREATE DATABASE vida;

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