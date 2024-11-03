import mongoose from "mongoose";
import Suspect from "../models/suspect.model.js";
import Log from "../models/log.model.js";
import { fileURLToPath } from 'url';
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const getLogsWithSuspectDetails = async (req, res) => {
    try {
        // Aggregate logs with suspect details
        const logs = await Log.aggregate([
            {
                $lookup: {
                    from: 'suspects',          // The collection name for suspects in MongoDB
                    localField: 'suspect_id',  // Field from `logs` collection
                    foreignField: 'suspect_id',// Field from `suspects` collection
                    as: 'suspectDetails'       // Name of the array to store the joined data
                }
            },
            { $unwind: '$suspectDetails' }   // Flatten the suspectDetails array
        ]);
        
        res.status(200).json(logs);
    } catch (error) {
        console.error("Error fetching logs with suspect details:", error);
        res.status(500).json({ error: "Failed to retrieve logs" });
    }
};

export const deleteLog = async (req, res) => {
    const { id } = req.params;
    try {
        const log = await Log.findByIdAndDelete(id);
        if (!log) {
            return res.status(404).json({ error: "Log not found" });
        }
        //file path for suspect is going to delete
        const logscreenshotpath = path.join(__dirname, '..','public','logs',log.screenshot);
        //delete the file if exists
        fs.unlink(logscreenshotpath, (err) => {
            if (err) {
                console.error("Error deleting log screenshot:", err);
                return res.status(500).json({ error: "Failed to delete log screenshot" });
            }
        });
        res.status(200).json({ message: "Log deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete log" });
    }
};
