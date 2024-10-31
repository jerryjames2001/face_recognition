import express from "express";
import { exec } from "child_process";

const router = express.Router();

router.post("/", (req, res) => {
    const { ipaddress } = req.body;

    // Run Python script and pass IP address as an argument
    exec(`python ../Face-Recognition-System/recognition/logger.py ${ipaddress}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error connecting to camera: ${error.message}`);
            return res.status(500).json({ error: "Failed to connect to camera" });
        }

        if (stderr) {
            console.error(`Script error: ${stderr}`);
            return res.status(500).json({ error: "Python script error" });
        }

        console.log(`Camera connected: ${stdout}`);
        res.json({ message: "Camera connected successfully" });
    });
});

export default router;
