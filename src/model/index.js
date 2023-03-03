import dotenv from "dotenv";
const conf = dotenv.config().parsed;
import mysql from "mysql2";

const conn = mysql
  .createPool({
    host: conf.HOSTNAME,
    user: conf.USERNAME,
    password: conf.PASSWORD,
    database: conf.DATABASE,
    port: conf.HOSTPORT || 3000,
  })
  .promise();

export default conn;
