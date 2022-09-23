<h1 align="center">NLW eSports API</h1>

<div align="center">
<img  src="./public/images/logo-nlw-esport.svg" /></div>

<h1 align="center" >Instalação</h1>

## Requisitos

<ul>
<li>Node.Js</li>
<li>Yarn ou Npm</li>
<li>Docker</li>
<li>Uma conta na Twitch Developers</li>
</ul>

A parte mais importante para o funcionamento da aplicação é criar uma conta na <a href="https://dev.twitch.tv/" target="_blank" >Twitch Developers</a> para conseguirmos utilizar sua Api. E para isso, será necessário registrar um aplicativo e resgatar o ID do cliente e o segredo do cliente, siga o passo a passo neste <a href="https://dev.twitch.tv/docs/api/get-started" target="_blank" >link</a>. Após isso, preencha as variáveis de ambiente seguindo o exemplo do arquivo **.env.example**. Obs: Não é necessário mudar os dados referente ao PostgreSQL.

Depois de preencher o seu **.env**, abra o terminal e instale as dependências com o _package manager_ de sua preferência: **yarn** ou **npm install**. Após isso iremos rodar o nosso container para podermos utilizar o PostgreSQL, rode o comando **docker-compose up** e espere concluir. Com o Postgres no ar, iremos popular o Database com os 20 primeiros jogos mais assistidos da Twitch, rode o comando **yarn prisma db seed** e depois **yarn prisma migrate dev**. Se você fez todos os passos corretamente, incluindo a criação da conta na Twitch Developers e o registro de aplicativo, os jogos estarão registrados. Rode o comando **yarn dev** e sua API estará pronta para uso.

<h1 align="center" >Rotas da aplicação</h1>

<h2 align ='center'> Listar jogos </h2>

Essa rota retorna todos os jogos cadastrados e quantos anuncios ele tem.

`GET /games - FORMATO DA REQUISIÇÃO`

`GET /games - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "1e416d9d-1c95-4cc4-a8a5-c41a1889ba58",
    "title": "Apex Legends",
    "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/511224.jpg",
    "_count": {
      "ads": 0
    }
  },
  {
    "id": "d1516d5a-708d-4e5e-982b-7b0eafe49851",
    "title": "Fortnite",
    "bannerUrl": "https://static-cdn.jtvnw.net/ttv-boxart/33214.jpg",
    "_count": {
      "ads": 0
    }
  }
]
```

<h2 align ='center'> Criar anúncio </h2>

Essa rota utilizaremos para criar um anúncio para um game. Na URL colocaremos o ID do jogo que queremos fazer o anúncio, já no corpo da requisição teremos ao todo 7 campos:

<ul>
    <li><strong>name</strong> | Nome do jogador.</li>
    <li><strong>discord</strong> | Discord do jogador.</li>
    <li><strong>yearsPlaying</strong> | Há quantos anos a pessoa joga o game.</li>
    <li><strong>hourStart</strong> | Horário que a pessoa irá começar a jogar.</li>
    <li><strong>hourEnd</strong> | Horário que a pessoa irá parar de jogar.</li>
    <li><strong>weekDays</strong> | Um array de números que representa os dias em que a pessoa irá jogar, sendo domingo o número 0 e sábado o número 6.</li>
    <li><strong>useVoiceChannel</strong> | Se o jogador irá usar chat de voz.</li>
</ul>

`POST /games/:game_id/ads - FORMATO DA REQUISIÇÃO`

```json
{
  "name": "Omar",
  "discord": "Teste",
  "hourStart": "22:00",
  "hourEnd": "18:00",
  "useVoiceChannel": true,
  "weekDays": [0, 5, 6],
  "yearsPlaying": 2
}
```

`POST /games/:game_id/ads - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "dceffb48-fe38-403c-ac45-a92f52870e95",
  "gameId": "1e416d9d-1c95-4cc4-a8a5-c41a1889ba58",
  "name": "Omar",
  "yearsPlaying": 2,
  "discord": "teste",
  "weekDays": [0, 5, 6],
  "hourStart": 1320,
  "hourEnd": 1080,
  "useVoiceChannel": true,
  "createdAt": "2022-09-23T02:40:45.730Z"
}
```

<h2 align ='center'> Resgatar todos os anúncios de um jogo</h2>

Utilizaremos essa rota para resgatarmos os anúncios registrados para um jogo específico. Na URL passaremos o ID do game.

<p>Obs: Reparem que não é retornado o discord da pessoa, para isso utilizaremos outra rota</>

`GET /games/:game_id/ads - FORMATO DA REQUISIÇÃO`

`POST /games/:game_id/ads - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "dceffb48-fe38-403c-ac45-a92f52870e95",
    "name": "Omar",
    "weekDays": [0, 5, 6],
    "useVoiceChannel": true,
    "yearsPlaying": 2,
    "hourStart": "22:00",
    "hourEnd": "18:00"
  }
]
```

<h2 align ='center'> Resgatar o Discord cadastrado em um anúncio específico </h2>

E por fim, utilizaremos essa rota para quando quisermos resgatar o Discord que foi cadastrado em algum anúncio. Na URL deveremos passar apenas o ID do anúncio.

`GET /ads/:ad_id/discord - FORMATO DA REQUISIÇÃO`

`GET /ads/:ad_id/discord - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "discord": "teste"
}
```
