import dotenv from "dotenv";
import path from "path";

// Load .env file from the root directory
const envPath = path.resolve(__dirname, "../.env"); 
dotenv.config({ path: envPath });
export const ENV = {
  SERVER: process.env.SERVER,
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DB: process.env.DATABASE,
  DRIVER: process.env.DRIVER,
  USER: process.env.USER,
  JWTSECRET:process.env.JWTSECRET
};
