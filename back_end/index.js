import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/databaseconnection.js";


dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

connectDB();


app.listen(3000, () => console.log("Example app is listening to port 3000"));
