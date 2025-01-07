// db.core.ts
import sql from "mssql/msnodesqlv8";
import { ENV } from "../config/environment.config";

// SQL Server configuration
const config: sql.config = {
  server: ENV.SERVER, // Replace with your server instance
  database: ENV.DB, // Replace with your database name
  options: {
    trustedConnection: true, // Use Windows Authentication
  },
  driver: ENV.DRIVER, // Use msnodesqlv8 driver
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to SQL Server successfully!");
    return pool;
  } catch (error) {
    console.error("Error connecting to SQL Server:", error);
    throw error;
  }
};
