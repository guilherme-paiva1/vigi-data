#!/bin/sh

echo "Aguardando o MySQL estar pronto em $MYSQL_HOST..."

# Espera até conseguir conectar na porta 3306
while ! nc -z $MYSQL_HOST 3306; do
  sleep 1
done

echo "MySQL está pronto. Iniciando aplicação Java..."
exec java -Xmx1024m -jar leitura-arquivos-excel.jar
