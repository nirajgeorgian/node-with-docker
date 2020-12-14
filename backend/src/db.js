import { Pool } from "pg";
import config from "./config";

const { connectionString } = config;

const databaseConfig = { connectionString };
const pool = new Pool(databaseConfig);

export default pool;
