const express = require("express");
const cors = require("cors");
const { getConnection } = require("./core/db.core");
const { userRouter } = require("./modules/user-management/user.controller");


const app = express();

app.use(express.json());

app.use("/api/v1/user-management", userRouter);
app.use(
  cors({
    origin: "*",
  })
);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(getConnection())
  console.log(
    `⚡️[server]: is running at local on http://localhost:${PORT}`
  );
});
