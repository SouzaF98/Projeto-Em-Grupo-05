import conn from "../model/index.js";

const zonaController = {
  getAll: async (req, res) => {
    try {
      const sql =
        "SELECT * FROM zonas WHERE zon_status='on' ORDER BY zon_nome;";
      const [rows] = await conn.query(sql);

      res.json({ data: rows });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },

  getOne: async (req, res) => {
    try {
      const id = req.params.id;

      const sql = "SELECT * FROM zonas WHERE zon_status='on' AND zon_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({ data: rows });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const sql = "UPDATE zonas SET zon_status='del' WHERE zon_id=?";
      const [rows] = await conn.query(sql, [id]);

      res.json({ sucesso: true, id: id, status: "Zona deletada com sucesso!" });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },

  post: async (req, res) => {
    try {
      const { nome, tipo } = req.body;

      const sql = "INSERT INTO zonas (zon_nome, zon_tipo) VALUES (?, ?);";
      const [rows] = await conn.query(sql, [nome, tipo]);

      res.json({
        sucesso: true,
        id: rows.insertId,
        status: "Zona inserida com sucesso!",
      });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },

  put: async (req, res) => {
    try {
      const id = req.params.id;

      const { nome, tipo } = req.body;

      const sql = "UPDATE zonas SET zon_nome=?, zon_tipo=? WHERE zon_id=?;";
      const [rows] = await conn.query(sql, [nome, tipo, id]);

      res.json({
        sucesso: true,
        id: id,
        status: "Zona atualizada com sucesso!",
      });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },
};

export default zonaController;
