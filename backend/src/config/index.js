// import { development, test, production } from './db-config.json'

const config = {
  jwtSecret: process.env.JWT_SECRET || "JWT_SECRET",
  aerospikeHosts: process.env.AEROSPIKE_HOSTS || "127.0.0.1:3000",
};

export default config;
