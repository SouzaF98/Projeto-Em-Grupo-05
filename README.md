# Projeto em Grupo - Módulo 5

## API Programadores Cariocas

Como o tema do nosso projeto, fizemos uma API baseada na iniciativa da Prefeitura do RJ.<br>
A API contém 4 rotas e todas as rotas contém todos os métodos HTTP (GET, POST, PUT, DELETE).<br>

## Como instalar e iniciar a API

- Primeiro certifique-se de ter instalado em seu computador os programas:
  - Node.js.
  - Uma IDE (usamos o Visual Studio Code).
  - Uma plataforma de API (usamos o Postman).
  - Uma plataforma de MySQL (usamos o XAMPP).
- Baixe os arquivos deste repositório ou clone-o localmente.
- Abra um terminal que suporte o Node.js e navegue até a pasta onde está localizado o repositório.

  > Por exemplo, `cd documents/usuario/repositorio`.

- Após isso, digite `npm install` no terminal.
- Inicie a plataforma de MySQL.
- Insira os dados que estão no caminho `src/model/sql/programadoresCariocas.sql` dentro da sua plataforma.
- Volte até o terminal e digite `npm start`, isso iniciará a API.
- Agora abra a plataforma de API e teste as rotas.

## Como usar a API

- Dentro da sua plataforma de API, existe um local para inserir uma URL, neste local, digite a seguinte URL: `http://localhost:3000/rota`.
- No lugar de **rota**, preencha com uma das 4 rotas disponíveis na API: **candidatos**, **aprovados**, **polos**, **zonas**.
- Agora escolha um dos métodos HTTP.
  > Importante dizer que nos métodos PUT e DELETE é obrigatório passar um **ID** como parâmetro na URL.<br>
  > No método GET isso se torna opcional.

### Visual da API fazendo as requisições

Método GET na rota de Candidatos para retornar todos os candidatos.<br>

![GET Candidatos](https://user-images.githubusercontent.com/113534686/222267792-ce61f0d4-19f6-4a73-be8b-109dbc8e3605.png)

Método GET na rota de Candidatos para retornar apenas um candidato.<br>

![GET Candidatos1](https://user-images.githubusercontent.com/113534686/222267914-14c5be6e-139b-4352-9c1a-c9337b2e1891.png)

Método POST na rota de Candidatos para inserir um candidato.<br>

![POST Candidatos](https://user-images.githubusercontent.com/113534686/222267936-590a7e5b-08c9-4297-b21b-16e47af3be90.png)

Método PUT na rota de Candidatos para atualizar um candidato.<br>

![PUT Candidatos1](https://user-images.githubusercontent.com/113534686/222267945-73acd7a7-b5e3-42ba-9ac7-3d7e1498a194.png)

Método DELETE na rota de Candidatos para deletar um candidato.<br>

![DELETE Candidatos1](https://user-images.githubusercontent.com/113534686/222267960-8f144c36-da7b-4fdc-85bf-7302e3581058.png)

Em todos os métodos, é necessário clicar em "Send" para obter a resposta.<br>
A resposta esperada de cada método HTTP é a seguinte:<br>
Método GET<br>

![Resposta de GET Candidatos](https://user-images.githubusercontent.com/113534686/222267965-8f030327-412f-40f6-8132-c213d7a48553.png)

![Resposta de GET Candidatos1](https://user-images.githubusercontent.com/113534686/222267979-2e1fdb49-03ec-4b1b-ba0d-476ba3b1eb64.png)

Método POST<br>

![Resposta de POST Candidatos](https://user-images.githubusercontent.com/113534686/222268048-bb6d04b3-ca0e-4db8-aa98-66376b833678.png)

Método PUT<br>

![Resposta de PUT Candidatos1](https://user-images.githubusercontent.com/113534686/222268096-4a1d7a48-2354-4176-ba36-0788d27b7f84.png)

Método DELETE<br>

![Resposta de DELETE Candidatos1](https://user-images.githubusercontent.com/113534686/222268117-a8db91bc-e357-4227-ad7d-bc62ea6be58a.png)

_Desenvolvido por:_<br>
_Brian Cerqueira_ [GitHub](https://github.com/briancerqueira)<br>
_Douglas Rocha_ [GitHub](https://github.com/dgsilva16)<br>
_Felippe Brasil_ [GitHub](https://github.com/FellyBrasil)<br>
_Fabiano Souza_ [GitHub](https://github.com/SouzaF98)<br>
_Gabriel Paiva_ [GitHub](https://github.com/gabrielp20)<br>
_Matheus Keher_ [GitHub](https://github.com/matheusjbk)<br>

_Este trabalho tem fins educacionais._
