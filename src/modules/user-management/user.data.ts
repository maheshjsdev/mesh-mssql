import sql from "msnodesqlv8";
import { ENV } from "../../config/environment.config";
import { getConnection } from "../../core/db.core";
import jwt from "jsonwebtoken";
const JWT_SECRET = `${ENV.JWTSECRET}`; // Replace with a secure key and store it in .env

const getUser = async (body: any) => {
  try {
    // Get a connection pool
    const pool = await getConnection();

    // Execute the query using sql.query
    const query = `SELECT * FROM userDetails ORDER BY id DESC`;

    const result = await pool.request().query(query);

    return result.recordset;
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
    const query = `
      INSERT INTO userDetails (first_name, last_name, email, mobile_no, password) 
      VALUES (@first_name, @last_name, @email, @mobile_no, @password)
    `;
    const { first_name, last_name, email, mobile_no, password } = body;

    // Create a request object
    const request = pool.request();
    request.input("first_name", first_name);
    request.input("last_name", last_name);
    request.input("email", email);
    request.input("mobile_no", mobile_no);
    request.input("password", password);

    // Execute the query
    const result = await request.query(query);

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
    delete updates["user"];
    const fields = Object.keys(updates)
      .map((key, index) => `[${key}] = @param${index}`)
      .join(", ");
    const request = pool.request();

    Object.keys(updates).forEach((key, index) => {
      request.input(`param${index}`, updates[key]);
    });

    const query = `UPDATE userDetails SET ${fields} WHERE id = @id`;
    request.input("id", id);

    const result = await request.query(query);

    console.log("Query Result:", result);

    return { success: true, message: "User updated successfully.", result };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const deleteUser = async (body: { id: number }) => {
  try {
    const pool = await getConnection();
    const { id } = body;

    const query = `DELETE FROM userDetails WHERE id = @id`;
    const request = pool.request();
    request.input("id", id);

    const result = await request.query(query);

    return { success: true, message: "User deleted successfully.", result };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

const changeUserStatus = async (body: { id: number; is_active: boolean }) => {
  try {
    const pool = await getConnection();
    const { is_active, id } = body;

    const query = `UPDATE userDetails SET is_active = @is_active WHERE id = @id`;
    const request = pool.request();
    request.input("is_active", is_active);
    request.input("id", id);

    const result = await request.query(query);

    return {
      success: true,
      message: "User status changed successfully.",
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
    const { email, password } = body;

    const query = `SELECT * FROM userDetails WHERE email = @Email AND password = @Password`;
    const request = pool.request();
    request.input("Email", email);
    request.input("Password", password);

    const rows = await request.query(query);

    if (Array.isArray(rows.recordset) && rows.recordset.length > 0) {
      const user = rows.recordset[0];

      // Generate JWT token
      const token = jwt.sign(
        { user }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: "8h" } // Token expiry
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

const verifyEmail = async (body: { email: string; password: string }) => {
  try {
    const pool = await getConnection();
    const { email, password } = body;

    let query;
    const request = pool.request();
    if (email && password === "") {
      query = `SELECT 1 FROM userDetails WHERE email = @Email`;
      request.input("Email", email);
    } else {
      query = `UPDATE userDetails SET password = @Password WHERE email = @Email`;
      request.input("Password", password);
      request.input("Email", email);
    }

    const result = await request.query(query);

    return email && password === ""
      ? { success: true, message: "Email is verified.", result }
      : {
          success: true,
          msg:'confirm',
          message: "Password has been successfully updated.",
          result,
        };
  } catch (error) {
    console.error("Password updating error:", error);
    throw error;
  }
};

const userData = {
  getUser,
  addUser,
  editUser,
  deleteUser,
  changeUserStatus,
  login,
  verifyEmail,
};

export default userData;
