import { getConnection } from "../../core/db.core";

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
}) => {
  try {
    const pool = await getConnection();
    const promisePool = pool.promise();
    const query = `
        INSERT INTO userDetails (first_name, last_name, email, mobile_no) 
        VALUES (?, ?, ?, ?)
      `;
    const { first_name, last_name, email, mobile_no } = body;
    const [result] = await promisePool.query(query, [
      first_name,
      last_name,
      email,
      mobile_no,
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

const userData = {
  getUser,
  addUser,
  editUser,
  deleteUser,
  chnageUserStatus,
};

export default userData;
