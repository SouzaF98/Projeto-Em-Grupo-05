// Importa conector do banco de dados.
import conn from "../model/index.js";

// Objeto que será executado quando ocorrer uma requisição HTTP para a entidade "aprovados".
const aprovadoController = {
  getAll: async (req, res) => {
    try {
      // Query que obtém os dados do banco de dados.
      const sql = "SELECT * FROM candidatos WHERE cands_status='on' ORDER BY aprov_colocacao";
      const [rows] = await conn.query(sql);

      // View de dados.
      res.json({ data: rows });
    } catch (error) {
      // Exibe mensagem de erro.
      res.json({ status: "error", message: error });
    }
  },

  getOne: async (req, res) => {
    try {
      // ID da requisição.
      const id = req.params.id;

      // Query que obtém um dado do banco de dados.
      const sql =
        "SELECT * FROM aprovados WHERE aprov_id=? AND cands_status='on'";
      const [rows] = await conn.query(sql, [id]);

      // View de dados.
      res.json({ data: rows });
    } catch (error) {
      // Exibe mensagem de erro.
      res.json({ status: "error", message: error });
    }
  },

  delete: async (req, res) => {
    try {
      // ID da requisição.
      const id = req.params.id;

      // Query que muda o status para "del".
      const sql = "UPDATE candidatos SET cands_status='del' WHERE cands_id=?";
      const [rows] = await conn.query(sql, [id]);

      // View de feedback.
      res.json({ id: id, status: "success" });
    } catch (error) {
      // Exibe mensagem de erro.
      res.json({ status: "error", message: error });
    }
  },

  post: async (req, res) => {
    try {
      // Extrai os campos do "req.body".
      const { colocacao, id_zona } = req.body;

      // Query de inserção do registro.
      const sql =
        "INSERT INTO aprovados (aprov_colocacao, zon_id) VALUES (?, ?)";
      const [rows] = await conn.query(sql, [
        colocacao,
        id_zona,
      ]);

      // View de feedback.
      res.json({ id: rows.insertId, status: "success" });
    } catch (error) {
      // Exibe mensagem de erro.
      res.json({ status: "error", message: error });
    }
  },

  put: async (req, res) => {
    try {
      // ID da requisição.
      const id = req.params.id;

      // Extrai os campos do "req.body".
      const { colocacao, id_zona } = req.body;

      // Query que atualiza o registro.
      const sql =
        "UPDATE aprovados SET aprov_colocacao=?, zon_id=? WHERE aprov_id=?";
      const [rows] = await conn.query(sql, [
        colocacao,
        id_zona,
        id,
      ]);

      // View de feedback.
      res.json({ id: id, status: "success" });
    } catch (error) {
      // Exibe mensagem de erro.
      res.json({ status: "error", message: error });
    }
  },
};

// Exporta o módulo.
export default aprovadoController;