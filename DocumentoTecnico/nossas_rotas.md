# Documento de lista de rotas em uso:

---

### Usuarios

- ```[POST] usuarios/entrar```
###### Faz pesquisa no banco através da matrícula e da senha de um usuário na tabela Usuario.
Essa rota é usada no login. Retorna as seguintes informações vindas do banco de dados:
> id_usuario
> nome
> email
> matricula
> perfil
> superior

- ```[POST] usuarios/cadastrar```
###### Faz inserção no banco de dados de um novo usuário na tabela Usuario.
Essa rota é usada no cadastro de policiais. Insere as seguintes informações no banco (o id_usuario é inserido automaticamente):
> nome
> email 
> matricula 
> perfil 
> superior 
> senha