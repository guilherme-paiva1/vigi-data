# Usa imagem do Java
FROM openjdk:21-jdk-slim

# Cria diretório no container
WORKDIR /app

# Copia o .jar para dentro do container
COPY TimeLogger.jar .

# Executa o jar ao iniciar o container
CMD ["java", "-jar", "TimeLogger.jar"]
