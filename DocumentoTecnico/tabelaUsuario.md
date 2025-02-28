# Tabela de cadastro de usuários

Cadastro de usuário precisa de uma tabela destino, padronizada da forma que este documento indica. 

# Tabela necessária no Banco de Dados

# Usuario
| Campo | Tipo | Dado armazenado |
|----------|----------|----------|
| Id   | int - primary key - autoincrement | Identificação única do usuário em nosso sistema   |
| Nome | varchar(45) | Nome do usuário |
| Matrícula   | varchar(7) | Matrícula de funcionário público, registro único de policiais civis, exemplo e onde encontrar abaixo   |
| Perfil   | varchar(8)   | Perfil correspondente ao usuário, pode ser 'Delegado' ou 'Policial'|
| Superior | int | Id correspondente ao superior do usuário, pode ser NULL, quando o usuário for delegado|
| Email   | varchar(45)   | Endereço eletrônico para contato com o policial e também para futura funcionalidade de recuperar senha   |
| Senha   | varchar(45)   | Senha de acesso do usuário (de preferência, criptografar no Banco)   |



# Links:
Fonte das matrículas:
[Portal de Transparência de Funcionários Públicos](https://portaldatransparencia.gov.br/servidores/consulta?paginacaoSimples=true&tamanhoPagina=&offset=&direcaoOrdenacao=asc&tipo=2&colunasSelecionadas=detalhar%2Ctipo%2Ccpf%2Cnome%2CorgaoServidorLotacao%2Cmatricula%2Csituacao%2Cfuncao%2Ccargo%2Cquantidade&t=3Q8uTW3dh0jPtP9roHJE) 
