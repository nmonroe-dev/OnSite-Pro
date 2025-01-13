const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "vendor", "contractor"],
        default: "contractor",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});





module.exports = mongoose.model("Login", authSchema);
