import { body, validationResult } from "express-validator";

const validacaoAprovado = [
  body("colocacao").isInt(),
  body("cota").isAlpha(),
  body("nota").isDecimal({ force_decimal: true }),
  body("final").isAlpha(),
  body("id_candidato").isInt(),
  body("id_zona").isInt(),
  (req, res, next) => {
    const err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({ sucesso: false, msg: err.array() });
    next();
  },
];

const validacaoCandidato = [
  body("nome").isLength({ min: 3 }),
  body("email").isEmail(),
  body("senha").isStrongPassword(),
  body("cpf").isLength({ min: 11 }),
  body("data_nasc").isDate(),
  body("telefone").isLength({ min: 10 }),
  body("celular").isLength({ min: 11 }),
  body("genero").isAlpha(),
  body("raca").isAlpha(),
  body("cep").isPostalCode("BR"),
  body("logradouro").isLength({ min: 3 }),
  body("numero").isInt(),
  body("complemento").isLength({ min: 3 }),
  body("bairro").isLength({ min: 3 }),
  body("cidade").isLength({ min: 3 }),
  body("estado").isLength({ min: 2, max: 2 }),
  (req, res, next) => {
    const err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({ sucesso: false, msg: err.array() });
    next();
  },
];

const validacaoPolo = [
  body("nome").isLength({ min: 3 }),
  body("cnpj").isLength({ min: 14 }),
  body("telefone").isLength({ min: 10 }),
  body("email").isEmail(),
  body("abertura").isTime(),
  body("encerramento").isTime(),
  body("cep").isPostalCode("BR"),
  body("logradouro").isLength({ min: 3 }),
  body("numero").isInt(),
  body("complemento").isLength({ min: 3 }),
  body("bairro").isLength({ min: 3 }),
  body("cidade").isLength({ min: 3 }),
  body("estado").isLength({ min: 2, max: 2 }),
  body("id_zona").isInt(),
  (req, res, next) => {
    const err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({ sucesso: false, msg: err.array() });
    next();
  },
];

const validacaoZona = [
  body("nome").isLength({ min: 3 }),
  body("tipo").isInt(),
  (req, res, next) => {
    const err = validationResult(req);

    if (!err.isEmpty())
      return res.status(400).json({ sucesso: false, msg: err.array() });
    next();
  },
];

const validacaoLogin = async (req, res, next) => {
  try {
    await body("email").isEmail().run(req);
    await body("senha").isStrongPassword().run(req);
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json({ sucesso: false, msg: err.array() });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export {
  validacaoAprovado,
  validacaoCandidato,
  validacaoPolo,
  validacaoZona,
  validacaoLogin,
};
