import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/databaseconnection.js";
import registerRouter from "./routes/register_login/registeration.js";
import loginRouter from "./routes/register_login/login.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())
connectDB();
app.use("/api", registerRouter);
app.use("/api", loginRouter);

app.listen(3000, () => console.log("Example app is listening to port 3000"));
