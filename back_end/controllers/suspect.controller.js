import Suspect from '../models/suspect.model.js';


// Function to add a suspect
export const addSuspect = async (req, res) => {
    const { suspect_id, name, caseName, details } = req.body;

    try {
        const newSuspect = new Suspect({
            suspect_id,
            name,
            caseName,
            details,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            },
        });
        await newSuspect.save();
        res.status(201).json(newSuspect);
    } catch (error) {
        console.error("Error adding suspect:", error);
        res.status(500).json({ message: "Failed to add suspect" });
    }
};

export const getSuspects = async (req, res) => {
    try {
        const suspects = await Suspect.find();
        // Convert binary data to Base64 for frontend compatibility
        const formattedSuspects = suspects.map((suspect) => ({
            ...suspect._doc,
            image: {
                data: suspect.image ? `data:${suspect.image.contentType};base64,${suspect.image.data.toString('base64')}` : null,
            },
        }));
        res.status(200).json(formattedSuspects);
    } catch (error) {
        console.error("Error getting suspects:", error);
        res.status(500).json({ message: "Failed to get suspects" });
    }
};

export const delSuspect = async (req, res) => {
    const id = req.params.id;
    try {
        await Suspect.findByIdAndDelete(id);
        res.status(200).json('Successfully deleted suspect');
    } catch (error) {
        res.status(500).json({ message: 'Error in deleting suspect', error: error.message });
    }
};