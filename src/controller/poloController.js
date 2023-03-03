import conn from "../model/index.js";

const poloController = {
  getAll: async (req, res) => {
    try {
      const sql =
        "SELECT * FROM polos WHERE polo_status='on' ORDER BY polo_nome;";
      const [rows] = await conn.query(sql);

      res.json({ data: rows });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;

      const sql = "SELECT * FROM polos WHERE polo_status='on' AND polo_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({ data: rows });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const sql = "UPDATE polos SET polo_status='del' WHERE polo_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({ sucesso: true, id: id, status: "Polo deletado com sucesso!" });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
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
        sucesso: true,
        id: rows.insertId,
        status: "Polo inserido com sucesso!",
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
        sucesso: true,
        id: id,
        status: "Polo atualizado com sucesso!",
      });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },
};

export default poloController;
