const Well = require("../models/wellSchema");
const User = require("../models/authSchema");
const axios = require("axios")

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await User.findById(userId).select("username _id"); 
        res.status(200).json({
            username: user.username,
            id: user._id,
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.addWellData = async (req, res) => {
    console.log("backend controller reached ")
    try {
        const  {wellName, wellLocation, hospital, emergencyContacts } = req.body;

        const wellData = {
            wellName,
            wellLocation,
            hospital,
            emergencyContacts,
            
        };
        if (!wellName || !wellLocation) {
            return res.status(400).json({ message: "Well Name and Location are required." });
        }
        

        const wellInfo = await Well.create(wellData);
        res.status(201).json({ message: "Well added successfully!", wellInfo });
    } catch (error) {
        console.error("Unable to add well data", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getWell = async (req, res) => {
    try{
        const getWellData = await Well.find();
        res.status(200).json(getWellData);
    }catch(error){
        console.error("Unable to fetch well data", error);
        res.status(500).json({message: "Server Error"});
    }
}

exports.checkIn = async (req, res) => {
    const { id } = req.params; 
    const { userId } = req.body; 

    try {
        const checkInData = {
            userId,
            timestamp: new Date(),
        };

        const updatedWell = await Well.findByIdAndUpdate(
            id,
            { $push: { checkIn: checkInData } },
            { new: true }
        );

        if (!updatedWell) {
            return res.status(404).json({ message: "Well not found" });
        }

        res.status(200).json(updatedWell);
    } catch (error) {
        console.error("Unable to check in", error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.checkOut = async (req, res) => {
    const { id } = req.params; 
    const { userId } = req.body; 

    try {
        
        const checkOutData = {
            userId,
            timestamp: new Date(),
        };

        
        const updatedWell = await Well.findByIdAndUpdate(
            id,
            {
                $push: { checkOut: checkOutData },
                $pull: { checkIn: { userId } },  
            },
            { new: true } 
        );

        if (!updatedWell) {
            return res.status(404).json({ message: "Well not found" });
        }

        res.status(200).json(updatedWell);
    } catch (error) {
        console.error("Unable to check out", error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.getWellbyId = async (req, res) => {
    const {id} = req.params;
    try{
        const getWell = await Well.findById(id);
        res.status(200).json(getWell);
    }catch(error){
        console.error("unable to fetch well data", error);
        res.status(500).json({message: "Server Error"});
    }
};

exports.incident = async (req, res) => {
    const { id } = req.params; 
    const incidentData = req.body; 

    try {
        const updatedWellincident = await Well.findByIdAndUpdate(
            id,
            { $push: { incidentReports: incidentData  } },
            { new: true }
        );

        if (!updatedWellincident) {
            return res.status(404).json({ message: "Well not found" });
        }
        console.log(updatedWellincident)
        res.status(200).json(updatedWellincident);
    } catch (error) {
        console.error("Unable to check out", error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.getEmergencyContacts = async (req, res) => {
    const { id } = req.params;
    try {
        const well = await Well.findById(id).select("emergencyContacts");
        if (!well) {
            return res.status(404).json({ message: "Well not found" });
        }
        res.status(200).json({ contacts: well.emergencyContacts });
    } catch (error) {
        console.error("Unable to fetch emergency contacts", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getMapData = async (req, res) => {
    const { hospitalLocation } = req.body; 
    const { street, city, state, zip, country } = hospitalLocation;

    try {
       
        const apiUrl = `https://nominatim.openstreetmap.org/search?street=${street}&city=${city}&state=${state}&postalcode=${zip}&country=${country}&format=json`;

        const response = await axios.get(apiUrl);
        const data = response.data; 

        if (data.length > 0) {
            const { lat, lon } = data[0]; 
            res.status(200).json({ lat, lon }); 
        } else {
            res.status(404).json({ error: "No results found for the given address" });
        }
    } catch (error) {
        console.error("Error fetching map data:", error);
        res.status(500).send("Unable to fetch map data");
    }
};
exports.getCheckedInUsers = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const well = await Well.findById(id).populate("checkIn.userId", "username");

        if (!well) {
            return res.status(404).json({ message: "Well not found" });
        }

        
        const checkedInUsers = well.checkIn.map((entry) => {
            const userAcknowledged = well.jsaAcknowledgments?.some(
                (ack) => ack.userId?.toString() === entry.userId?._id?.toString()
            );
            return {
                username: entry.userId?.username || "Unknown User",
                timestamp: entry.timestamp,
                wellName: well.wellName,
                acknowledgedJsa: userAcknowledged || false,
            };
        });

        res.status(200).json(checkedInUsers);
    } catch (error) {
        console.error("Unable to fetch checked-in users", error);
        res.status(500).json({ message: "Server Error" });
    }
};



exports.uploadJsa = async (req, res) => {
    const { wellId, userId } = req.body;

    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const well = await Well.findByIdAndUpdate(
            wellId,
            {
                $set: {
                    jsa: {
                        filename: req.file.filename,
                        filepath: `/uploads/jsa/${req.file.filename}`,
                        uploadedBy: userId, 
                        uploadedAt: new Date(),
                    },
                },
            },
            { new: true }
        );

        if (!well) {
            return res.status(404).json({ message: "Well not found" });
        }

        res.status(200).json({ message: "JSA uploaded successfully!", well });
    } catch (error) {
        console.error("Error uploading JSA:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


exports.acknowledgeJsa = async (req, res) => {
    const { id } = req.params; 
    const { userId } = req.body;

    try {
        const well = await Well.findById(id);
        if (!well) {
            return res.status(404).json({ message: "Well not found" });
        }

        
        const alreadyAcknowledged = well.jsaAcknowledgments.some(
            (ack) => ack.userId && ack.userId.toString() === userId
        );

        if (alreadyAcknowledged) {
            return res.status(400).json({ message: "User has already acknowledged the JSA." });
        }

        
        well.jsaAcknowledgments.push({ userId });
        await well.save();

        res.status(200).json({ message: "JSA acknowledgment recorded." });
    } catch (error) {
        console.error("Error acknowledging JSA:", error);
        res.status(500).json({ message: "Server error." });
    }
};


exports.getJsa = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const well = await Well.findById(id);

        if (!well) {
            return res.status(404).json({ message: "Well not found" });
        }

        
        if (!well.jsa || !well.jsa.filepath) {
            return res.status(404).json({ message: "JSA file not found for this well." });
        }

        res.status(200).json(well.jsa);
    } catch (error) {
        console.error("Error fetching JSA file:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
