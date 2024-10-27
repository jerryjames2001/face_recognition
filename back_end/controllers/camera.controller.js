import mongoose from "mongoose";
import Camera from "../models/camera.model.js";

export const createCamera = async (req, res) => {
    const { ipaddress, location, latitude, longitude } = req.body;

    if (!ipaddress || !location || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newCamera = new Camera({ ipaddress, location, latitude, longitude });
    try {
        await newCamera.save();
        res.status(201).json(newCamera);
    } catch (error) {
        res.status(500).json("Error in inserting camera",error.message );
    }
}

export const getCameras = async (req, res) => {
    try {
        const cameras = await Camera.find();
        res.status(200).json({ sucess: true, data: cameras });
    } catch (error) {
        res.status(500).json({ message: "Error in fetching camera" });
    }
}


export const delCamera = async (req, res) => {
    const id = req.params.id;
    try {
        await Camera.findByIdAndDelete(id);
        res.status(200).json('Successfully deleted camera');
    } catch (error) {
        res.status(500).json({ message: 'Error in deleting camera', error: error.message });
    }
};
