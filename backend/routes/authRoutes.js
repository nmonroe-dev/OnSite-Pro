const express = require("express");
const authControllers = require("../controllers/authControllers");
const route = express.Router();

route.post("/register", authControllers.register);
route.post("/login", authControllers.login);


module.exports = route;