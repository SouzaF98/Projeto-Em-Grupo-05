import jwt from "jsonwebtoken";
import { promisify } from "util";
import dotenv from "dotenv";
const conf = dotenv.config().parsed;

export default async function eAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      sucesso: false,
      msg: "Necessário realizar o login para acessar a página. Token não fornecido.",
    });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(400).json({
      sucesso: false,
      msg: "Necessário realizar o login para acessar a página. Token não fornecido.",
    });
  }

  try {
    const decode = await promisify(jwt.verify)(token, conf.JWT_PRIVATEKEY);

    req.userId = decode.id;
    next();
  } catch (error) {
    return res.status(400).json({
      sucesso: false,
      msg: "Necessário realizar o login para acessar a página. Token inválido.",
    });
  }
}
