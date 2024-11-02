import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/databaseconnection.js";


import cameraRouter from "./routes/camera.route.js";
import cameraConnector from "./routes/connector.route.js";
import suspectRouter from "./routes/suspect.route.js";
import logRouter from "./routes/log.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/logs', express.static('public/logs'));

app.use("/api/cameras", cameraRouter);
app.use("/api/connect-camera", cameraConnector);
app.use("/api/suspects", suspectRouter);
app.use("/api/logs", logRouter);


connectDB();
app.listen(PORT, () => console.log("Example app is listening to port ", PORT));