FROM openjdk:21-jdk-slim

WORKDIR /app

COPY leitura-arquivos-excel.jar ./leitor.jar

ENV MYSQL_USER=svc_vida \
    MYSQL_PASSWORD=urubu100


CMD ["java", "-jar", "leitor.jar"]

