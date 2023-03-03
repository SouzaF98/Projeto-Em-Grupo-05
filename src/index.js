import express from "express";
const app = express();

import bodyParser from "body-parser";
const bodyParsed = bodyParser.json();

import appRouter from "./controller/routes.js";

app.use(bodyParsed);

app.use(appRouter);

const port = process.env.HTTPPORT || 3000;

app.listen(port, () => {
  console.log(`Executando servidor em http://localhost:${port}`);
});
