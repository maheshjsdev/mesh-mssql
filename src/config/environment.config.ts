import dotenv from "dotenv";
import path from "path";

// Load .env file from the root directory
const envPath = path.resolve(__dirname, "../.env"); 
dotenv.config({ path: envPath });
export const ENV = {
  PORT: process.env.TIDB_PORT,  
  HOST: process.env.TIDB_HOST,
  DB: process.env.TIDB_DATABASE,
  USER: process.env.TIDB_USER,
  PASSWORD:process.env.TIDB_PASSWORD,
  SSL:process.env.TIDB_ENABLE_SSL,
  JWTSECRET:process.env.JWT_SECRET
};


