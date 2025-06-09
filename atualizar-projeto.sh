#!/bin/bash

# 1. Executar outro script (ex: setup.sh)
echo "Executando setup.sh..."
../setup-leitor.sh

# 2. Fazer git pull no repositório atual
echo "Atualizando repositório com git pull..."
git pull origin develop

# 3. Criando as imagens Docker
echo "Criando imagens Docker..."
docker build -t site-imagem:latest ./Site/.
docker build -t imagem-sql:latest ./database/.
docker build -t imagemjava:latest ./leitor-excel/.

# 4. Subir os containers com docker-compose
echo "Derrubando e recriando os containers com compose"
cd ./database
docker-compose down
docker-compose up -d
