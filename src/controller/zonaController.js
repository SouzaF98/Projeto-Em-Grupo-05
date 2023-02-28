import conn from "../model/index.js";

import { body, validationResult } from "express-validator";

const zonaController = {
  getAll: async (req, res) => {
    try {
      const sql =
        "SELECT * FROM zonas WHERE zon_status='on' ORDER BY zon_nome;";
      const [rows] = await conn.query(sql);

      res.json({ data: rows });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;

      const sql = "SELECT * FROM zonas WHERE zon_status='on' AND zon_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({ data: rows });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const sql = "UPDATE zonas SET zon_status='del' WHERE zon_id=?";
      const [rows] = await conn.query(sql, [id]);

      res.json({ erro: false, id: id, status: "Zona deletada com sucesso!" });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  post: async (req, res) => {
    try {
      const { nome, tipo } = req.body;

      await body("nome").isLength({ min: 3 }).run(req);
      await body("tipo").isInt().run(req);

      const err = validationResult(req);

      if (!err.isEmpty()) return res.json({ erro: true, msg: err.array() });

      const sql = "INSERT INTO zonas (zon_nome, zon_tipo) VALUES (?, ?);";
      const [rows] = await conn.query(sql, [nome, tipo]);

      res.json({
        erro: false,
        id: rows.insertId,
        status: "Zona inserida com sucesso!",
      });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  put: async (req, res) => {
    try {
      const id = req.params.id;

      const { nome, tipo } = req.body;

      await body("nome").isLength({ min: 3 }).run(req);
      await body("tipo").isInt().run(req);

      const err = validationResult(req);

      if (!err.isEmpty()) return res.json({ erro: true, msg: err.array() });

      const sql = "UPDATE zonas SET zon_nome=?, zon_tipo=? WHERE zon_id=?;";
      const [rows] = await conn.query(sql, [nome, tipo, id]);

      res.json({
        erro: false,
        id: id,
        status: "Zona atualizada com sucesso!",
      });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },
};

export default zonaController;
