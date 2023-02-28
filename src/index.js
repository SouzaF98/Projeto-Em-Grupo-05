import express from "express";
const app = express();

import dotenv from "dotenv";
const conf = dotenv.config().parsed;

const port = conf.HTTPPORT || 3000;

import appRouter from "./controller/routes.js";

app.use(appRouter);

app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`);
});
