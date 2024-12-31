import { Request, Response } from "express";
import userData from "./user.data";
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userData.getUser(req.body);
    res.send(result);
  } catch (err) {
    res.json("fail");
  }
};

const addUser = async (req: Request, res: Response) => {
  try {
    const result = await userData.addUser(req.body);
    res.send(result);
  } catch (err) {
    res.json("fail");
  }
};
const editUser = async (req: Request, res: Response) => {
  try {
    const result = await userData.editUser(req.body);
    res.send(result);
  } catch (err) {
    res.json("fail");
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userData.deleteUser(req.body);
    res.send(result);
  } catch (err) {
    res.json("fail");
  }
};
const chnageUserStatus = async (req: Request, res: Response) => {
  try {
    const result = await userData.chnageUserStatus(req.body);
    res.send(result);
  } catch (err) {
    res.json("fail");
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await userData.login(req.body);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result); // Unauthorized
    }
  } catch (err) {
    console.error("Error in login route", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const result = await userData.verifyEmail(req.body);
    res.send(result);
  } catch (err) {
    res.json("fail");
  }
};


const userService = {
  getAllUser,
  addUser,
  editUser,
  deleteUser,
  chnageUserStatus,
  login,
  verifyEmail
};

export default userService;
