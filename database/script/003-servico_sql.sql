-- Criação do usuário
CREATE USER IF NOT EXISTS 'svc_vida'@'%' IDENTIFIED BY 'urubu100';

-- Concessão de permissões ao usuário
GRANT ALL PRIVILEGES ON vida.* TO 'svc_vida'@'%';

-- Aplicação das permissões
FLUSH PRIVILEGES;