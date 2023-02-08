# S5-19 | 🏁 Entrega: KImóveis - TypeORM com Relacionamentos

Para inciar este projeto, é necessário instalar as dependências, que serão utilizadas nos testes. Portanto utilize o comando abaixo para instalar tais dependências:

````
yarn install
````


**Atenção:** é necessário utilizar o `yarn` pois esse projeto foi iniciado com esse gerenciador de pacotes.

Para verificar se já possui o gerenciador yarn instalado utilize o seguinte :

````
yarn --version
````

Caso não possua o yarn instalado, utilize o comando abaixo para instalar globalmente na sua máquina:

````
npm install --global yarn
````
<br>

# **Sobre a feature de proteção a ataques de força bruta**

Um Ataque de Força Bruta consiste em tentar acertar credenciais válidas para uma aplicação a partir de tentativa e erro de todos os valores possíveis. São ataques feitos por scripts ou programas que automatizam as requisições para a funcionalidade de login da aplicação, enviando diferentes combinações de nomes de usuário e senhas, até que uma credencial válida seja encontrada. Embora a Força Bruta seja comumente utilizada contra mecanismos de autenticação, um atacante pode se beneficiar de ataques contra quaisquer funcionalidades que processem dados. Nos mecanismos de cadastro e recuperação de senha, por exemplo, este abuso pode gerar consequências danosas à aplicação alvo.

A feature foi criada com o intuito de treinar o uso de limitadores de taxa usando consumo de pontos no Redis com enfoque na proteção da aplicação para ataques de força bruta no login.

Foram criados dois limitadores de taxa com o Redis. O primeiro conta o número de tentativas consecutivas com falha e permite no máximo 10 por nome de usuário e IP do usuário, sendo uma proteção de curto período. O segundo bloqueia o IP por um dia em 100 tentativas fracassadas por dia, sendo uma proteção de tempo mais longo se as tentativas fracassadas persistirem. 

Os limitadores consomem 1 ponto por IP para cada solicitação ao login da aplicação. Com isso, não são permitidas muitas tentativas de senhas ou email errados, bloqueando a conta do usuário e seu IP por um período determinado. 

A lógica foi criada com base no seguinte repositório: https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example

Foi modificada a forma de verificação de login, usando serializer com yup e pesquisa do usuário no banco de dados, usando de fato como um middleware de verificação em TypeScript e sendo feito de maneira funcional e coesa com a lógica que o projeto KImóveis já detinha previamente.

Para testar a feature é recomendado usar o middleware na rota da seguinte forma: 

`loginRouter.post("", loginBruteForce, createSessionController);`

No insomnia, a rota usada é a /login, tendo o seguinte exemplo para o corpo de requisição:

`
{
	"email":"teste_adm@teste.com",
	"password": "123456"
}
`

Se as credenciais  estiverem coerentes com o usuário previamente criado na rota de criação /users a resposta é a seguinte:

`
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlX2FkbUB0ZXN0ZS5jb20iLCJpc0FkbSI6dHJ1ZSwiaXNBY3RpdmUiOnRydWUsImlhdCI6MTY3NDIyNjMwNSwiZXhwIjoxNjc0MzEyNzA1LCJzdWIiOiJjZjczYzBjZi04ODg2LTQzOWEtYTQzNy0yMzgyZDc3MjdkYWQifQ.n856dGoheiKJmSyU4FmbYaWZu8k8qHZmruzm9AS70IE"
}
`

Se as credenciais estiverem erradas:

`
{
	"status": "error",
	"statusCode": 400,
	"message": "email or password is wrong",
	"time": {
		"message": "Faltam 9 tentativas no espaço de x tempo"
	}
}
`

<br>


O projeto já está com o Docker configurado, basta preencher as variáveis de ambiente no .env

Basta buildar e subir nossos containers usando o comando padrão:
````
docker-compose up --build
````

ou
````
docker compose up --build
````
O comando pode variar com a versão do docker compose instalada em sua máquina

***ATENÇÃO:*** a porta utilizada para rodar nosso docker é a `5431`.
Caso tenha algum problema com essa porta, basta alterá-la no docker-compose.yml.

<br>

# **Sobre os testes**

Essa aplicação possui testes, que serão utilizados para validar, se todas as regras de negócio foram aplicadas de maneira correta.

Os testes estão localizados em `src/__tests__`.

Na subpasta `integration` estão os testes.

Já na subpasta `mocks` estão os dados que serão utilizados para os testes.

No arquivo `jest.config.json` estão algumas configurações necessárias para os testes rodarem.

**`De modo algum altere qualquer um desses arquivos.`** Isso poderá comprometer a integridade dos testes.

E também não altere o script de `test` localizado no `package.json`. Isso será utilizado para rodar os testes.

** `Para que  todos os testes passem:`** Retire o middleware (loginBruteForce)

Esse middleware foi criado para testar conhecimentos de Redis, com o intuito de testar proteção de aplicações contra ataques de força bruta. Ele tem limitação de taxa com Redis, com isso ao executar os testes, com esse middleware na rota de login, todos os testes não irão passar pois eles foram criados com o intuito de verificar apenas se o login é feito ou não, apenas analisando um simples login sem incrementos.    

<br>


# **Rodando os testes** 

Para rodar os testes é necessário que no seu terminal, você esteja dentro do diretório do projeto.

Estando no terminal e dentro do caminho correto, você poderá utilizar os comandos a seguir:

### Rodar todos os testes
````
yarn test
````
#
### Rodar todos os testes e ter um log ainda mais completo
````
yarn test --verbose ou yarn test --all
````
#

### Rodar os testes de uma pasta específica
`detalhe: repare que tests está envolvido por 2 underlines. Isso se chama dunder.`
````
yarn test ./scr/__tests__/integration/<subpasta>
````
#
### Rodar os testes de um arquivo específico
````
yarn test ./scr/__tests__/integration/<subpasta>/<arquivo>
````
#
### Rodar um teste específico
````
yarn test -t <describe ou test específico envolto em aspas>
````
````
\\ ex: yarn test -t "/categories"
\\ rodaria os testes do describe "/categorias" no caminho
\\ ./scr/__tests__/integration/categories/categoriesRoutes.test.ts
````

<br>


**Caso você queira verificar todas as opções de execução de testes, visite a [Documentação oficial do Jest](https://jestjs.io/docs/cli)**

Após rodar um dos comandos aparecerá um log no seu terminal, contendo as informações da execução do teste.

**Observação:** O teste pode demorar alguns segundos para ser finalizado. Quanto maior for o teste, mais tempo será consumido para a execução.

#



### Agora que já sabe como iniciar o seu projeto e rodar os testes, é hora de colocar a mão no código!
