import mongoose from "mongoose";

const suspectSchema = new mongoose.Schema({
    suspect_id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    caseName: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
})
const Suspect = mongoose.model('Suspect', suspectSchema);
export default Suspect;