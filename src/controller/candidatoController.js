import conn from "../model/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const conf = dotenv.config().parsed;

const candidatoController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const sql = `SELECT cand_id, cand_nome, cand_email, cand_senha FROM candidatos WHERE cand_email='${email}';`;
      const [rows] = await conn.query(sql, [email, senha]);

      if (email !== rows[0].cand_email) {
        return res.status(400).json({
          sucesso: false,
          msg: "Usuário ou senha incorretos.",
        });
      }

      if (!(await bcrypt.compare(senha, rows[0].cand_senha))) {
        return res.status(400).json({
          sucesso: false,
          msg: "Usuário ou senha incorretos.",
        });
      }

      const token = jwt.sign({ id: rows[0].cand_id }, conf.JWT_PRIVATEKEY, {
        // expiresIn: 60 // 1 min
        // expiresIn: 600 // 10 min
        expiresIn: "7d", // 7 dias
      });
      res.json({ sucesso: true, msg: "Login realizado com sucesso!", token });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },

  getAll: async (req, res) => {
    try {
      const sql =
        "SELECT *, DATE_FORMAT(cand_data, '%d/%m/%Y') AS data_cadastro, DATE_FORMAT(cand_nascimento, '%d/%m/%Y') AS data_nascimento FROM candidatos WHERE cand_status='on' ORDER BY cand_data DESC;";
      const [rows] = await conn.query(sql);

      res.json({ data: rows });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
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
      res.status(400).json({ sucesso: false, msg: error });
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
      res.status(400).json({ sucesso: false, msg: error });
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

      const password = await bcrypt.hash(senha, 8);

      const sql = `INSERT INTO candidatos (cand_nome, cand_email, cand_senha, cand_cpf, cand_nascimento, cand_telefone, cand_celular, cand_genero, cand_raca, cand_cep, cand_logradouro, cand_numero, cand_complemento, cand_bairro, cand_cidade, cand_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      const [rows] = await conn.query(sql, [
        nome,
        email,
        password,
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
      res.status(400).json({ sucesso: false, msg: error });
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

      const password = await bcrypt.hash(senha, 8);

      const sql =
        "UPDATE candidatos SET cand_nome=?, cand_email=?, cand_senha=?, cand_cpf=?, cand_nascimento=?, cand_telefone=?, cand_celular=?, cand_genero=?, cand_raca=?, cand_cep=?, cand_logradouro=?, cand_numero=?, cand_complemento=?, cand_bairro=?, cand_cidade=?, cand_estado=? WHERE cand_id=?;";
      const [rows] = await conn.query(sql, [
        nome,
        email,
        password,
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
      res.status(400).json({ sucesso: false, msg: error });
    }
  },
};

export default candidatoController;
