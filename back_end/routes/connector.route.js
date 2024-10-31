import express from "express";
import { spawn } from "child_process";

const router = express.Router();

router.post("/", (req, res) => {
    const { ipaddress } = req.body;

    // Run initial connection check
    const connectionProcess = spawn('python', ['../Face-Recognition-System/recognition/connection_check.py', ipaddress]);

    // Handle output from the connection check
    connectionProcess.on('close', (code) => {
        if (code === 0) {  // Success
            console.log("Connection successful, starting logger_main");

            // Start logger_main in detached mode
            const mainProcess = spawn('python', ['../Face-Recognition-System/recognition/logger.py', ipaddress], {
                detached: true,
                stdio: 'ignore'
            });
            mainProcess.unref();

            res.json({ message: "Camera connected and logging started" });
        } else {  // Failure
            res.status(500).json({ message: "Failed to connect to camera" });
        }
    });
});

export default router;
