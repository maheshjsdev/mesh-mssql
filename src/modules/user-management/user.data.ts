import { ENV } from "../../config/environment.config";
import { getConnection } from "../../core/db.core";
import jwt from "jsonwebtoken";
const JWT_SECRET = `${ENV.JWTSECRET}`; // Replace with a secure key and store it in .env

const getUser = async (body: any) => {
  try {
    // Get a connection pool
    const pool = await getConnection();

    // Ensure promise-based pool connection
    const promisePool = pool.promise();
    const query = `SELECT * FROM userDetails`;

    // Execute the query
    const [rows] = await promisePool.query(query);

    return rows;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
const addUser = async (body: {
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  password: string;
}) => {
  try {
    const pool = await getConnection();
    const promisePool = pool.promise();
    const query = `
        INSERT INTO userDetails (first_name, last_name, email, mobile_no, password) 
        VALUES (?, ?, ?, ?, ?)
      `;
    const { first_name, last_name, email, mobile_no, password } = body;
    const [result] = await promisePool.query(query, [
      first_name,
      last_name,
      email,
      mobile_no,
      password,
    ]);
    console.log("User added successfully:", result);

    return {
      success: true,
      message: "User added successfully",
    };
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

const editUser = async (body: { id: number; [key: string]: any }) => {
  try {
    const { id, ...updates } = body;
    const pool = await getConnection();
    const promisePool = pool.promise();

    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updates), id];

    const query = `UPDATE userDetails SET ${fields} WHERE id = ?`;
    const [result] = await promisePool.query(query, values);

    return { success: true, message: "User updated successfully.", result };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
const deleteUser = async (body: { id: number }) => {
  try {
    const pool = await getConnection();
    const promisePool = pool.promise();
    const { id } = body;
    const query = `DELETE FROM userDetails WHERE id = ?`;
    const [result] = await promisePool.query(query, [id]);

    return { success: true, message: "User delete successfully.", result };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const chnageUserStatus = async (body: { id: number; user_status: boolean }) => {
  try {
    const pool = await getConnection();
    const promisePool = pool.promise();
    const { user_status, id } = body;
    const query = `UPDATE userDetails SET user_status = ? WHERE id = ?`;
    const [result] = await promisePool.query(query, [user_status, id]);

    return {
      success: true,
      message: "Changing user status successfully.",
      result,
    };
  } catch (error) {
    console.error("Error changing user status:", error);
    throw error;
  }
};

export const login = async (body: { email: string; password: string }) => {
  try {
    const pool = await getConnection();
    const promisePool = pool.promise();
    const { email, password } = body;

    const query = `SELECT * FROM userDetails WHERE email = ? AND password = ?`;
    const [rows] = await promisePool.query(query, [email, password]);

    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0];

      // Generate JWT token
      const token = jwt.sign(
        { user: user }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: "1h" } // Token expiry
      );

      return {
        success: true,
        message: "User login has been successful.",
        user: user,
        token: token, // Return the token in the response
      };
    } else {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }
  } catch (error) {
    console.error("Error logging in user", error);
    throw error;
  }
};

const userData = {
  getUser,
  addUser,
  editUser,
  deleteUser,
  chnageUserStatus,
  login,
};

export default userData;
