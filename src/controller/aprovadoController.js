import conn from "../model/index.js";

const aprovadoController = {
  getAll: async (req, res) => {
    try {
      const sql =
        "SELECT resul_colocacao, cand_nome, zon_nome FROM cand_resultados AS cr INNER JOIN candidatos AS c ON cr.cand_id=c.cand_id INNER JOIN zonas AS z ON cr.zon_id=z.zon_id WHERE resul_status='on' AND resul_final='aprovado' ORDER BY resul_colocacao;";
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
        "SELECT resul_colocacao, cand_nome, zon_nome FROM cand_resultados AS cr INNER JOIN candidatos AS c ON cr.cand_id=c.cand_id INNER JOIN zonas AS z ON cr.zon_id=z.zon_id WHERE resul_status='on' AND resul_final='aprovado' AND c.cand_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({ data: rows });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },

  delete: async (req, res) => {
    try {
      const id = req.params.id;

      const sql =
        "UPDATE cand_resultados SET resul_status='del' WHERE cand_id=?;";
      const [rows] = await conn.query(sql, [id]);

      res.json({
        sucesso: true,
        id: id,
        status: "Resultado deletado com sucesso!",
      });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },

  post: async (req, res) => {
    try {
      const { colocacao, cota, nota, final, id_candidato, id_zona } = req.body;

      const sql =
        "INSERT INTO cand_resultados (resul_colocacao, resul_cota, resul_nota, resul_final, cand_id, zon_id) VALUES (?, ?, ?, ?, ?, ?);";
      const [rows] = await conn.query(sql, [
        colocacao,
        cota,
        nota,
        final,
        id_candidato,
        id_zona,
      ]);

      res.json({
        sucesso: true,
        id: rows.insertId,
        status: "Resultado inserido com sucesso!",
      });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },

  put: async (req, res) => {
    try {
      const id = req.params.id;

      const { colocacao, cota, nota, final, id_candidato, id_zona } = req.body;

      const sql =
        "UPDATE cand_resultados SET resul_colocacao=?, resul_cota=?, resul_nota=?, resul_final=?, cand_id=?, zon_id=? WHERE cand_id=?;";
      const [rows] = await conn.query(sql, [
        colocacao,
        cota,
        nota,
        final,
        id_candidato,
        id_zona,
        id,
      ]);

      res.json({
        sucesso: true,
        id: id,
        msg: "Resultado atualizado com sucesso!",
      });
    } catch (error) {
      res.status(400).json({ sucesso: false, msg: error });
    }
  },
};

export default aprovadoController;
