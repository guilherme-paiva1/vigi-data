FROM openjdk:21-jdk-slim

WORKDIR /app

# Instala o netcat (nc) para verificar disponibilidade do MySQL
RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean


# Copia o JAR e o script de inicialização
COPY leitura-arquivos-excel.jar ./
COPY entrypoint.sh ./entrypoint.sh

# Dá permissão de execução no entrypoint
RUN chmod +x entrypoint.sh

# Define variáveis de ambiente
ENV MYSQL_USER=svc_vida \
    MYSQL_PASSWORD=urubu100

# Define o script de entrada
ENTRYPOINT ["./entrypoint.sh"]
