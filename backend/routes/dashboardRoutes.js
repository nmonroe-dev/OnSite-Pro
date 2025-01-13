const express = require("express");
const wellController = require("../controllers/wellControllers");
const multerConfig = require("../config/multerConfig");

const route = express.Router();

route.post("/well", wellController.addWellData);
route.get("/wells", wellController.getWell);
route.post("/:id/checkin", wellController.checkIn);
route.post("/:id/checkout", wellController.checkOut);
route.get("/userDetail", wellController.getUserDetails);
route.get("/getwell/:id", wellController.getWellbyId);
route.post("/:id/incident", wellController.incident);
route.post("/map", wellController.getMapData);
route.get("/:id/emergencyContacts", wellController.getEmergencyContacts);
route.get("/:id/checkedInUsers", wellController.getCheckedInUsers);
route.post("/uploadJsa", multerConfig.single("file"), wellController.uploadJsa);
route.post("/:id/acknowledgeJsa", wellController.acknowledgeJsa);
route.get("/:id/jsa", wellController.getJsa);






module.exports = route;