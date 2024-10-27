import mongoose from "mongoose";

const cameraSchema = new mongoose.Schema({
    ipaddress: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
}, { timestamps: true }
);
const Camera = mongoose.model('Camera', cameraSchema);
export default Camera;