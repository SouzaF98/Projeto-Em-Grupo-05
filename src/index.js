import express from "express";
const app = express();

import cors from "cors";

import bodyParser from "body-parser";
const bodyParsed = bodyParser.json();

import appRouter from "./controller/routes.js";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  app.use(cors());
  next();
});

app.use(bodyParsed);

app.use(appRouter);

const port = process.env.HTTPPORT || 3000;

app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`);
});
