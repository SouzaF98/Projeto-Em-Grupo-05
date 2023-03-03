import express from "express";
const router = express.Router();

import {
  validacaoAprovado,
  validacaoCandidato,
  validacaoPolo,
  validacaoZona,
  validacaoLogin,
} from "./validation.js";

import eAdmin from "./auth.js";

router.get("/admin", eAdmin, (req, res) => {
  res.json({
    sucesso: true,
    msg: "Painel Administrativo",
    id_usuario_logado: req.userId,
  });
});

import aprovadoController from "./aprovadoController.js";

router.get("/aprovados/", aprovadoController.getAll);
router.get("/aprovados/:id", aprovadoController.getOne);
router.delete("/aprovados/:id", aprovadoController.delete);
router.post("/aprovados/", validacaoAprovado, aprovadoController.post);
router.put("/aprovados/:id", validacaoAprovado, aprovadoController.put);

import candidatoController from "./candidatoController.js";

router.post("/login/", validacaoLogin, candidatoController.login);
router.get("/candidatos/", candidatoController.getAll);
router.get("/candidatos/:id", candidatoController.getOne);
router.delete("/candidatos/:id", candidatoController.delete);
router.post("/candidatos/", validacaoCandidato, candidatoController.post);
router.put("/candidatos/:id", validacaoCandidato, candidatoController.put);

import poloController from "./poloController.js";

router.get("/polos/", poloController.getAll);
router.get("/polos/:id", poloController.getOne);
router.delete("/polos/:id", poloController.delete);
router.post("/polos/", validacaoPolo, poloController.post);
router.put("/polos/:id", validacaoPolo, poloController.put);

import zonaController from "./zonaController.js";

router.get("/zonas/", zonaController.getAll);
router.get("/zonas/:id", zonaController.getOne);
router.delete("/zonas/:id", zonaController.delete);
router.post("/zonas/", validacaoZona, zonaController.post);
router.put("/zonas/:id", validacaoZona, zonaController.put);

export default router;
