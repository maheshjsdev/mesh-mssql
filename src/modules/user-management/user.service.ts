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

const userService = {
  getAllUser,
  addUser,
  editUser,
  deleteUser,
  chnageUserStatus
};

export default userService;
