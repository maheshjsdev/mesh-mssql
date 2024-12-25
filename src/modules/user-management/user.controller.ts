import express, { Router } from "express";
import userService from "./user.service";
import { authenticateToken } from "../../core/token-authorize.core";

export const userRouter: Router = express.Router();
userRouter.get("/getuser", authenticateToken, userService.getAllUser);
userRouter.post("/adduser", authenticateToken, userService.addUser);
userRouter.post("/edituser", authenticateToken, userService.editUser);
userRouter.post("/deleteuser", authenticateToken, userService.deleteUser);
userRouter.post("/changeuserstatus", authenticateToken, userService.chnageUserStatus);
userRouter.post("/login", userService.login);
