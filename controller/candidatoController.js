// Importa conector do banco de dados.
import conn from "../model/index.js";

// Objeto que será executado quando ocorrer uma requisição HTTP para a entidade "candidatos".
const candidatoController = {
  // Lista todos os registros de usuários.
  getAll: async (req, res) => {
    try {
      const sql = "SELECT * FROM candidatos WHERE cands_status='on' ORDER BY cands_nome";
      const [rows] = conn.query(sql);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Lista apenas um registro de usuário.
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const sql = "SELECT * FROM candidatos WHERE cands_status='on' AND cands_id=?";
      const [rows] = conn.query(sql, [id]);
      res.json({ data: rows });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Muda o status de um registro para "del".
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const sql = "UPDATE candidatos SET cands_status='del' WHERE cands_id=?";
      const [rows] = conn.query(sql, [id]);
      res.json({ id: id, status: "success" });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Insere um registro de usuário.
  post: async (req, res) => {
    try {
      const { nome, cpf, email, telefone, celular, genero, raca, cota, nota, status, id_aprovado, id_endereco } = req.body;
      const sql =
        "INSERT INTO candidatos (cands_nome, cands_cpf, cands_email, cands_telefone, cands_celular, cands_genero, cands_raca, cands_cota, cands_nota, cands_status, aprov_id, ender_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const [rows] = conn.query(sql, [nome, cpf, email, telefone, celular, genero, raca, cota, nota, status, id_aprovado, id_endereco]);
      res.json({ id: rows.insertId, status: "success" });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },

  // Atualiza um registro de usuário.
  put: async (req, res) => {
    try {
      const id = req.params.id;
      const { nome, cpf, email, telefone, celular, genero, raca, cota, nota, status, id_aprovado, id_endereco } = req.body;
      const sql =
        "UPDATE candidatos SET cands_nome=?, cands_cpf=?, cands_email=?, cands_telefone=?, cands_celular=?, cands_genero=?, cands_raca=?, cands_cota=?, cands_nota=?, cands_status=?, aprov_id, ender_id WHERE cands_id=?";
      const [rows] = conn.query(sql, [
        nome,
        cpf,
        email,
        telefone,
        celular,
        genero,
        raca,
        cota,
        nota,
        status,
        id_aprovado,
        id_endereco,
        id
      ]);
      res.json({ id: id, status: "success" });
    } catch (error) {
      res.json({ status: "error", message: error });
    }
  },
};

// Exporta o módulo.
export default candidatoController;