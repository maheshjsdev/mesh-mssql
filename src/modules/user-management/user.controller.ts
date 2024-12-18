import exprees, { Router } from "express";
import userService from "./user.service";
export const userRouter: Router = exprees.Router();
userRouter.get("/getuser", userService.getAllUser);
userRouter.post("/adduser", userService.addUser);
userRouter.post("/edituser", userService.editUser);
userRouter.post("/deleteuser", userService.deleteUser);
