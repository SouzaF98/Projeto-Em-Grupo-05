import express from "express";

const router = express.Router();

// Extrai os dados do cabeçalho da requisição usando "JSON".
import bodyParser from "body-parser";
const bodyParsed = bodyParser.json();

router.get("/", (req, res) => {
  res.json({
    erro: true,
    msg: "Caminho não encontrado",
  });
});

import aprovadoController from "./aprovadoController.js";

router.get("/aprovados/", aprovadoController.getAll);
router.get("/aprovados/:id", aprovadoController.getOne);
router.delete("/aprovados/:id", aprovadoController.delete);
router.post("/aprovados/", bodyParsed, aprovadoController.post);
router.put("/aprovados/:id", bodyParsed, aprovadoController.put);

import candidatoController from "./candidatoController.js";

router.get("/candidatos/", candidatoController.getAll);
router.get("/candidatos/:id", candidatoController.getOne);
router.delete("/candidatos/:id", candidatoController.delete);
router.post("/candidatos/", bodyParsed, candidatoController.post);
router.put("/candidatos/:id", bodyParsed, candidatoController.put);

import poloController from "./poloController.js";

router.get("/polos/", poloController.getAll);
router.get("/polos/:id", poloController.getOne);
router.delete("/polos/:id", poloController.delete);
router.post("/polos/", bodyParsed, poloController.post);
router.put("/polos/:id", bodyParsed, poloController.put);

import zonaController from "./zonaController.js";

router.get("/zonas/", zonaController.getAll);
router.get("/zonas/:id", zonaController.getOne);
router.delete("/zonas/:id", zonaController.delete);
router.post("/zonas/", bodyParsed, zonaController.post);
router.put("/zonas/:id", bodyParsed, zonaController.put);

export default router;
