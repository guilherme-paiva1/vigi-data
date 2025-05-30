# use a imagem oficial do MySQL como imagem base
FROM mysql:8.0
# defina variáveis de ambiente para a senha do rrot do MySQL
ENV MYSQL_PASSWORD=urubu100
ENV MYSQL_USER=svc_vida
ENV MYSQL_DATABASE=vida
ENV MYSQL_ROOT_PASSWORD=urubu100
# copie os scripts SQL de inicialização para um diretório temporário no container
COPY ./script/ /docker-entrypoint-initdb.d/
# exponha a porta padrão do MySQL
EXPOSE 3306
