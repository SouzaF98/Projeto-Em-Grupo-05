// Carrega a biblioteca "Express".
import express from "express";

// Cria um roteamento "Express".
const router = express.Router();

// Extrai os dados do cabeçalho da requisição usando "JSON".
import bodyParser from "body-parser";
const bodyParsed = bodyParser.json();

// Rota raíz apresenta erro.
router.get("/", (req, res) => {
  res.json({
    status: "error",
    message: "Caminho não encontrado",
  });
});

// Carrega o controller de "aprovados".
import aprovadoController from "./aprovadoController.js";

// Rota para GET, retornando todos os registros.
router.get("/aprovado/", aprovadoController.getAll);

// Rota para GET, retornando apenas um registro.
router.get("/aprovado/:id", aprovadoController.getOne);

// Rota para DELETE, atualizando o status para "del".
router.delete("/aprovado/:id", aprovadoController.delete);

// Rota para POST, inserindo um registro na tabela. bodyParsed (no hook) é utilizado para garantir a chegada de um JSON.
router.post("/aprovado/", bodyParsed, aprovadoController.post);

// Rota para PUT, atualizando um registro da tabela. bodyParsed (no hook) é utilizado para garantir a chegada de um JSON.
router.put("/aprovado/:id", bodyParsed, aprovadoController.put);

// Carrega o controller de "candidatos".
import candidatoController from "./candidatoController.js";

// Rotas para o candidato.
// Rota para GET, retornando todos os registros.
router.get("/candidato/", candidatoController.getAll);

// Rota para GET, retornando apenas um registro.
router.get("/candidato/:id", candidatoController.getOne);

// Rota para DELETE, atualizando o status para "del".
router.delete("/candidato/:id", candidatoController.delete);

// Rota para POST, inserindo um registro na tabela. bodyParsed (no hook) é utilizado para garantir a chegada de um JSON.
router.post("/candidato/", bodyParsed, candidatoController.post);

// Rota para PUT, atualizando um registro da tabela. bodyParsed (no hook) é utilizado para garantir a chegada de um JSON.
router.put("/candidato/:id", bodyParsed, candidatoController.put);

export default router;