
![readme](https://github.com/user-attachments/assets/5f2af819-5f98-4c92-84db-e91c43f809c1)

# Exemplo de leitura de arquivos excel utilizando a biblioteca Apache POI

## ⚙️ Configuração de Ambiente:

### Passo a passo da execução:

1. Clonar Repositório
2. Abrir projeto no IntelliJ ou sua IDE de preferencia
3. Executar projeto na IDE

## 📚 O que é o Apache POI?

Apache POI é uma biblioteca Java desenvolvida pela Apache Software Foundation que fornece suporte
para formatos de arquivos do Microsoft Office, como .doc, .docx, .xls, .xlsx, etc.

Neste exemplo, vamos utilizar a biblioteca Apache POI para ler arquivos Excel (.xlsx e .xls).

## 💡Lendo arquivos Excel com Apache POI

### 1. Adicione as dependências Maven necessárias ao seu arquivo `pom.xml`:

```xml

<dependencies>
  <dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.3.0</version>
  </dependency>
  <dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.3.0</version>
  </dependency>
</dependencies>
```

### 2. Instancie um objeto Workbook

`Workbook` é a classe principal do Apache POI. Ela representa um arquivo Excel e possui
métodos para manipular planilhas, linhas e células.

Ao instanciar um Workbook, é necessário passar como parâmetro o arquivo que será lido. Este arquivo
é representado por um objeto `InputStream`.

Caso a extensão do arquivo seja `.xlsx`, utilizamos a classe `XSSFWorkbook`. Caso seja um arquivo
`.xls`, utilizamos a classe `HSSFWorkbook`.

```java
Path caminho = Path.of("melhores-livros.xlsx");
InputStream arquivo = Files.newInputStream(caminho);

Workbook workbook = new XSSFWorkbook(arquivo);
```

### 3. Manipule os dados do Workbook

Para acessar uma planilha específica, utilizamos o método `getSheetAt()`, passando o índice da
planilha desejada.

```java
// Acessando a primeira planilha
Sheet sheet = workbook.getSheetAt(0);
```

Para acessar as linhas e respectivas células de uma planilha, utilizamos os métodos `getRow()` e
`getCell()`, passando seus respectivos índices.

```java
// Acessando a primeira linha da planilha
Row row = sheet.getRow(0);

// Acessando a primeira célula da linha
Cell cell = row.getCell(0);
```

Para pegar o valor de uma célula, podemos utilizar vários métodos. Temos métodos diferentes para
tipos de dados diferentes.

Por exemplo, se quisermos pegar o valor de uma célula que é uma String, podemos utilizar o
método `getStringCellValue()`.

```java
String valor = cell.getStringCellValue();
```

### 4. Feche o Workbook

Quando terminar de ler o arquivo, é importante fechar o Workbook para liberar recursos.

```java
workbook.close();
```

<span style="color:#ffb02e;font-size:1.5em;">⚠️ IMPORTANTE!</span>

O Apache POI **NÃO** consegue ler arquivos .csv; É necessário
convertê-lo para .xlsx ou .xls.

## 🤓 Dúvidas?

Caso tenha algúma dúvida, recomendamos ler a documentação oficial do Apache POI:
[https://javadoc.io/doc/org.apache.poi/poi/latest/index.html](https://javadoc.io/doc/org.apache.poi/poi/latest/index.html)
