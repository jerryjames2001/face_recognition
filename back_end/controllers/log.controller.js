import mongoose from "mongoose";
import Suspect from "../models/suspect.model.js";
import Log from "../models/log.model.js";


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
