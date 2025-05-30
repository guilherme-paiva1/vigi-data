# Stage 1: Build
FROM node:18-alpine AS builder

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de definição de dependências
COPY web-data-viz/package*.json ./

# Instalar dependências
RUN npm install 

# Stage 2: Runtime
FROM node:18-alpine

# Garantir que o diretório de trabalho exista
WORKDIR /app

# Copiar apenas dependências do builder
COPY --from=builder /app/node_modules ./node_modules

# Copiar o restante da aplicação
COPY /web-data-viz .

# Expor porta padrão (ajuste conforme sua aplicação)
EXPOSE 8080

# Definir comando padrão para iniciar a aplicação
CMD [ "npm", "start" ]
