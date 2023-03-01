import conn from "../model/index.js";

import { body, validationResult } from "express-validator";

const candidatoController = {
  getAll: async (req, res) => {
    try {
      const sql =
        "SELECT *, DATE_FORMAT(cand_data, '%d/%m/%Y') AS data_cadastro, DATE_FORMAT(cand_nascimento, '%d/%m/%Y') AS data_nascimento FROM candidatos WHERE cand_status='on' ORDER BY cand_data DESC;";
      const [rows] = await conn.query(sql);

      res.json({ data: rows });
    } catch (error) {
      res.json({ sucesso: false, msg: error });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;

      const sql =
        "SELECT *, DATE_FORMAT(cand_data, '%d/%m/%Y') AS data_cadastro, DATE_FORMAT(cand_nascimento, '%d/%m/%Y') AS data_nascimento FROM candidatos WHERE cand_status='on' AND cand_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({ data: rows });
    } catch (error) {
      res.json({ sucesso: false, msg: error });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const sql = "UPDATE candidatos SET cand_status='del' WHERE cand_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({
        sucesso: true,
        id: id,
        status: "Candidato deletado com sucesso!",
      });
    } catch (error) {
      res.json({ sucesso: false, msg: error });
    }
  },

  post: async (req, res) => {
    try {
      const {
        nome,
        email,
        senha,
        cpf,
        data_nasc,
        telefone,
        celular,
        genero,
        raca,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      } = req.body;

      await body("nome").isLength({ min: 3 }).run(req);
      await body("email").isEmail().run(req);
      await body("senha").isStrongPassword().run(req);
      await body("cpf").isLength({ min: 11 }).run(req);
      await body("data_nasc").isDate().run(req);
      await body("telefone").isLength({ min: 10 }).run(req);
      await body("celular").isLength({ min: 11 }).run(req);
      await body("genero").isAlpha().run(req);
      await body("raca").isAlpha().run(req);
      await body("cep").isPostalCode("BR").run(req);
      await body("logradouro").isLength({ min: 3 }).run(req);
      await body("numero").isInt().run(req);
      await body("complemento").isLength({ min: 3 }).run(req);
      await body("bairro").isLength({ min: 3 }).run(req);
      await body("cidade").isLength({ min: 3 }).run(req);
      await body("estado").isLength({ min: 2, max: 2 }).run(req);

      const err = validationResult(req);

      if (!err.isEmpty()) return res.json({ sucesso: false, msg: err.array() });

      const sql =
        "INSERT INTO candidatos (cand_nome, cand_email, cand_senha, cand_cpf, cand_nascimento, cand_telefone, cand_celular, cand_genero, cand_raca, cand_cep, cand_logradouro, cand_numero, cand_complemento, cand_bairro, cand_cidade, cand_estado) VALUES (?, ?, SHA1(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
      const [rows] = await conn.query(sql, [
        nome,
        email,
        senha,
        cpf,
        data_nasc,
        telefone,
        celular,
        genero,
        raca,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      ]);

      res.json({
        sucesso: true,
        id: rows.insertId,
        status: "Candidato inserido com sucesso!",
      });
    } catch (error) {
      res.json({ sucesso: false, msg: error });
    }
  },

  put: async (req, res) => {
    try {
      const id = req.params.id;

      const {
        nome,
        email,
        senha,
        cpf,
        data_nasc,
        telefone,
        celular,
        genero,
        raca,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      } = req.body;

      await body("nome").isLength({ min: 3 }).run(req);
      await body("email").isEmail().run(req);
      await body("senha").isStrongPassword().run(req);
      await body("cpf").isLength({ min: 11 }).run(req);
      await body("data_nasc").isDate().run(req);
      await body("telefone").isLength({ min: 10 }).run(req);
      await body("celular").isLength({ min: 11 }).run(req);
      await body("genero").isAlpha().run(req);
      await body("raca").isAlpha().run(req);
      await body("cep").isPostalCode("BR").run(req);
      await body("logradouro").isLength({ min: 3 }).run(req);
      await body("numero").isInt().run(req);
      await body("complemento").isLength({ min: 3 }).run(req);
      await body("bairro").isLength({ min: 3 }).run(req);
      await body("cidade").isLength({ min: 3 }).run(req);
      await body("estado").isLength({ min: 2, max: 2 }).run(req);

      const err = validationResult(req);

      if (!err.isEmpty()) return res.json({ sucesso: false, msg: err.array() });

      const sql =
        "UPDATE candidatos SET cand_nome=?, cand_email=?, cand_senha=SHA1(?), cand_cpf=?, cand_nascimento=?, cand_telefone=?, cand_celular=?, cand_genero=?, cand_raca=?, cand_cep=?, cand_logradouro=?, cand_numero=?, cand_complemento=?, cand_bairro=?, cand_cidade=?, cand_estado=? WHERE cand_id=?;";
      const [rows] = await conn.query(sql, [
        nome,
        email,
        senha,
        cpf,
        data_nasc,
        telefone,
        celular,
        genero,
        raca,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
        id,
      ]);

      res.json({
        sucesso: true,
        id: id,
        status: "Candidato atualizado com sucesso!",
      });
    } catch (error) {
      res.json({ sucesso: false, msg: error });
    }
  },
};

export default candidatoController;
