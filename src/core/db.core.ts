import mysql from "mysql2";
import { ENV } from "../config/environment.config";
export const getConnection = async () => {
  return mysql.createPool({
    host: ENV.HOST, // Hostname from environment variable
    port: 4000, // Convert port to a number
    user: ENV.USER, // User from environment variable
    password: ENV.PASSWORD, // Password from environment variable
    database: ENV.DB, // Database name from environment variable
    ssl: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true,
    },
    connectionLimit: 1, // Limit to 1 connection in serverless environment
    maxIdle: 1, // Max idle connections
    enableKeepAlive: true, // Keep connections alive
  });
};
