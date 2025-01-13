const mongoose = require("mongoose");

const ConnectDB = async () => {
    try{
        await
        mongoose.connect(process.env.Mongo_Url);
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Unable to Connect to MongoDB",error);
        process.exit(1);
    }
};


module.exports = ConnectDB;