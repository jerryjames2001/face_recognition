import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    suspect_id: {
        type: Number,
        required: true
    },
    screenshot: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    cam_id: {
        type: String,
        required: true
    }
});

const Log = mongoose.model('Log', logSchema, 'logs');

export default Log;
