const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config();
const ConnectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const { checkToken } = require("./controllers/authControllers");

const app = express();
ConnectDB();
app.use("/uploads/jsa", express.static("uploads/jsa"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use("/", authRoutes);
app.use("/user", checkToken, dashboardRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server Running on http://localhost:${process.env.PORT}`);
});