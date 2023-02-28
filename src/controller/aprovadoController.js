import conn from "../model/index.js";

import { body, validationResult } from "express-validator";

const aprovadoController = {
  getAll: async (req, res) => {
    try {
      const sql =
        "SELECT cr_colocacao, cand_nome, cand_sobrenome, zon_nome FROM cand_resultados AS cr INNER JOIN candidatos AS c ON cr.cand_id=c.cand_id INNER JOIN zonas AS z ON cr.zon_id=z.zon_id WHERE cr_status='on' AND cr_final='aprovado' ORDER BY cr_colocacao;";
      const [rows] = await conn.query(sql);

      res.json({ data: rows });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;

      const sql =
        "SELECT cr_colocacao, cand_nome, cand_sobrenome, zon_nome FROM cand_resultados AS cr INNER JOIN candidatos AS c ON cr.cand_id=c.cand_id INNER JOIN zonas AS z ON cr.zon_id=z.zon_id WHERE cr_status='on' AND cr_final='aprovado' AND c.cand_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({ data: rows });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const sql = "UPDATE cand_resultados SET cr_status='del' WHERE cand_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({
        erro: false,
        id: id,
        status: "Resultado deletado com sucesso!",
      });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  post: async (req, res) => {
    try {
      const { colocacao, cota, nota, final, id_candidato, id_zona } = req.body;

      const sql =
        "INSERT INTO cand_resultados (cr_colocacao, cr_cota, cr_nota, cr_final, cand_id, zon_id) VALUES (?, ?, ?, ?, ?, ?);";
      const [rows] = await conn.query(sql, [
        colocacao,
        cota,
        nota,
        final,
        id_candidato,
        id_zona,
      ]);

      await body("colocacao").isInt().run(req);
      await body("cota").isAlpha().run(req);
      await body("nota").isDecimal({ force_decimal: true }).run(req);
      await body("final").isAlpha().run(req);
      await body("id_candidato").isInt().run(req);
      await body("id_zona").isInt().run(req);

      const err = validationResult(req);

      if (!err.isEmpty()) return res.json({ erro: true, msg: err.array() });

      res.json({
        erro: false,
        id: rows.insertId,
        status: "Resultado inserido com sucesso!",
      });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  put: async (req, res) => {
    try {
      const id = req.params.id;

      const { colocacao, cota, nota, final, id_candidato, id_zona } = req.body;

      const sql =
        "UPDATE cand_resultados SET cr_colocacao=?, cr_cota=?, cr_nota=?, cr_final=?, cand_id=?, zon_id=? WHERE cand_id=?;";
      const [rows] = await conn.query(sql, [
        colocacao,
        cota,
        nota,
        final,
        id_candidato,
        id_zona,
        id,
      ]);

      await body("colocacao").isInt().run(req);
      await body("cota").isAlpha().run(req);
      await body("nota").isDecimal({ force_decimal: true }).run(req);
      await body("final").isAlpha().run(req);
      await body("id_candidato").isInt().run(req);
      await body("id_zona").isInt().run(req);

      const err = validationResult(req);

      if (!err.isEmpty()) return res.json({ erro: true, msg: err.array() });

      res.json({
        erro: false,
        id: id,
        msg: "Resultado atualizado com sucesso!",
      });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },
};

export default aprovadoController;
