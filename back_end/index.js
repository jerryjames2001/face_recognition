import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/databaseconnection.js";

import cameraRouter from "./routes/camera.route.js";
import cameraConnector from "./routes/connector.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

app.use("/api/cameras", cameraRouter);
app.use("/api/connect-camera", cameraConnector);


connectDB();
app.listen(PORT, () => console.log("Example app is listening to port ", PORT));