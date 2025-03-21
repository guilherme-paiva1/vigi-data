# Fluxo de trabalho GitHub

Git WorkFlow é uma abordagem de trabalho usando Git. Esse fluxo resolve problemas como conflitos, o famoso `git merge`.

# Imagem explicativa (master é a main)
<img width="500" src="imgs\git\workflow.png">

Nós vamos nos adaptar a esse fluxo, usando a `main` para o código que sabemos que está funcionando, e a `develop` para avaliação e testagem de código desenvolvido.

Abaixo, explico o funcionamento desse fluxo.

# Fluxo tarefa -> develop -> main
Ao desenvolver uma tarefa nesse fluxo, é necessário criar uma branch com o nome dela.

Branches são sequências de trabalho no Git, como a `main` que todos usamos quando trabalhamos no Git. A diferença é que vamos criar as nossas próprias branches para dividir o trabalho corretamente e evitar problemas.

Por exemplo, estou desenvolvendo a tarefa de nome "Adição da data-viz no projeto". Minha branch se chamará `data-viz`, por exemplo. Existem duas opções para criar uma branch.

# Primeira opção:
<h4>Através do site do GitHub</h4>
<h6>1. Entre no repositório e encontre o botão "branches"</h6>
<img width="400" src="imgs\git\branches.png">

<h6>2. Dentro da tela de branches, encontre o botão "new branch" ou "nova branch" na parte superior direita da tela</h6>
<img width="400" src="imgs\git\new_branch.png">

<h6>3. Na janela que se abrirá, coloque o nome da branch que você vai criar e em "Source" (fonte), troque para `develop`, depois clique em "Create new branch"</h6>
<img width="400" src="imgs\git\creating_new.png">
A fonte marca de qual branch a sua própria branch vai nascer. Ao marcar `develop`, tudo que foi desenvolvido e foi subido para a `develop` automaticamente vai para a sua branch `data-viz`.

É importante que a fonte seja a `develop`, pois isso garante que você terá as alterações mais recentes de desenvolvimento.

# Segunda opção:
<h4>Através do Git Bash</h4>

<h6>1. Troque para a branch `develop`. Isso garante que a branch que você vai criar vai se basear na `develop`.</h6>

```sh
git switch develop
```

<h6>2. Crie a nova branch através do comando `git switch -c`.</h6>
O parâmetro `-c` indica "create", ou seja, esse comando cria e troca imediatamente para a branch criada. 

```sh
git switch -c data-viz
```

# Branch criada

##### Troque para a branch correta.
Se você optou por criar a branch pelo site, use o comando
```sh
git pull
```
para trazer a branch que acabou de criar para sua máquina. 

Depois:
```sh
git switch data-viz
```
Para trocar para a branch que criou.

##### Garanta que está na branch correta.
É possível verificar a branch atual através de 

```sh
git status
```

Ou pelo canto inferior esquerdo do VSCode, que indica o nome da branch que você está atualmente. Lembre que você quer estar na branch de nome da tarefa que você vai desenvolver.

## Agora é só codar!

Ao terminar de desenvolver, é só dar push normalmente, ou se quiser mais segurança, na hora de dar push:

```sh
git push origin data-viz
```

O complemento do comando indica em qual branch você vai dar push, e isso é omitido quando você dá push normalmente. Ou seja, ao dar push para a `main` sem o complemento (como semestre passado), ele automaticamente complementava com

```sh
git push origin main
```

por debaixo dos panos.