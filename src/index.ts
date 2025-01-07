import express, { Express } from "express";
import cors from "cors";
import { ENV } from "./config/environment.config";
import { userRouter } from "./modules/user-management/user.controller";

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/v1/user-management", userRouter);

// Start the server
const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log(`⚡️[server]: is running at local on http://localhost:${PORT}`);
});
