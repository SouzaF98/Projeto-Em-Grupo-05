import conn from "../model/index.js";

import { body, validationResult } from "express-validator";

const poloController = {
  getAll: async (req, res) => {
    try {
      const sql =
        "SELECT * FROM polos WHERE polo_status='on' ORDER BY polo_nome;";
      const [rows] = await conn.query(sql);

      res.json({ data: rows });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;

      const sql = "SELECT * FROM polos WHERE polo_status='on' AND polo_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({ data: rows });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const sql = "UPDATE polos SET polo_status='del' WHERE polo_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({ erro: false, id: id, status: "Polo deletado com sucesso!" });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  post: async (req, res) => {
    try {
      const {
        nome,
        cnpj,
        telefone,
        email,
        abertura,
        encerramento,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        id_zona,
      } = req.body;

      await body("nome").isLength({ min: 3 }).run(req);
      await body("cnpj").isLength({ min: 14 }).run(req);
      await body("telefone").isLength({ min: 10 }).run(req);
      await body("email").isEmail().run(req);
      await body("abertura").isTime().run(req);
      await body("encerramento").isTime().run(req);
      await body("cep").isPostalCode("BR").run(req);
      await body("logradouro").isLength({ min: 3 }).run(req);
      await body("numero").isInt().run(req);
      await body("complemento").isLength({ min: 3 }).run(req);
      await body("bairro").isLength({ min: 3 }).run(req);
      await body("cidade").isLength({ min: 3 }).run(req);
      await body("estado").isLength({ min: 2, max: 2 }).run(req);
      await body("id_zona").isInt().run(req);

      const err = validationResult(req);

      if (!err.isEmpty()) return res.json({ erro: true, msg: err.array() });

      const sql =
        "INSERT INTO polos (polo_nome, polo_cnpj, polo_telefone, polo_email, polo_hora_abertura, polo_hora_encerramento, polo_cep, polo_logradouro, polo_numero, polo_complemento, polo_bairro, polo_cidade, polo_estado, zon_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
      const [rows] = await conn.query(sql, [
        nome,
        cnpj,
        telefone,
        email,
        abertura,
        encerramento,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        id_zona,
      ]);

      res.json({
        erro: false,
        id: rows.insertId,
        status: "Polo inserido com sucesso!",
      });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },

  put: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        nome,
        cnpj,
        telefone,
        email,
        abertura,
        encerramento,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        id_zona,
      } = req.body;

      await body("nome").isLength({ min: 3 }).run(req);
      await body("cnpj").isLength({ min: 14 }).run(req);
      await body("telefone").isLength({ min: 10 }).run(req);
      await body("email").isEmail().run(req);
      await body("abertura").isTime().run(req);
      await body("encerramento").isTime().run(req);
      await body("cep").isPostalCode("BR").run(req);
      await body("logradouro").isLength({ min: 3 }).run(req);
      await body("numero").isInt().run(req);
      await body("complemento").isLength({ min: 3 }).run(req);
      await body("bairro").isLength({ min: 3 }).run(req);
      await body("cidade").isLength({ min: 3 }).run(req);
      await body("estado").isLength({ min: 2, max: 2 }).run(req);
      await body("id_zona").isInt().run(req);

      const err = validationResult(req);

      if (!err.isEmpty()) return res.json({ erro: true, msg: err.array() });

      const sql =
        "UPDATE polos SET polo_nome=?, polo_cnpj=?, polo_telefone=?, polo_email=?, polo_hora_abertura=?, polo_hora_encerramento=?, polo_cep=?, polo_logradouro=?, polo_numero=?, polo_complemento=?, polo_bairro=?, polo_cidade=?, polo_estado=?, zon_id=? WHERE polo_id=?;";
      const [rows] = await conn.query(sql, [
        nome,
        cnpj,
        telefone,
        email,
        abertura,
        encerramento,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        id_zona,
        id,
      ]);

      res.json({
        erro: false,
        id: id,
        status: "Polo atualizado com sucesso!",
      });
    } catch (error) {
      res.json({ erro: true, msg: error });
    }
  },
};

export default poloController;
