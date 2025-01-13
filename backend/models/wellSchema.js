const mongoose = require("mongoose");

const wellSchema = new mongoose.Schema({
    wellName: {
        type: String,
        required: true,
    },
    wellLocation: {
        type: String, 
        required: true,
    },
    checkIn: [ 
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Login", 
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    checkOut: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", 
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    incidentReports: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", 
                required: true, 
            },
            title: {
                type: String,
                required: true, 
                trim: true, 
            },
            description: {
                type: String,
                required: true, 
                trim: true, 
            },
            reportedBy: {
                type: String,
            },
            timestamp: {
                type: Date,
                default: Date.now, 
            },
        },
    ],
    hospital: 
        {
            hospitalName: {
                type: String,
            },
            hospitalLocation: {
                type: String,
                required: true
            }
        },
    
    emergencyContacts: [
        {
            contactName: {
                type: String,
                required: true, 
            },
            contactNumber: {
                type: String,
                required: true,
            },
            contactPosition: {
                type: String,
                required: true,
            },
        },
    ],
    jsa: {
        filename: {
             type: String 
            },
        filepath: { 
            type: String 
        },
        uploadedAt: { 
            type: Date, default: Date.now 
        },
        isImage: { 
            type: Boolean, default: true
         }, 
    },
    
    jsaAcknowledgments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Login",
            },
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    msds: {
        type: String, 
    },
});

module.exports = mongoose.model("Well", wellSchema);
