const Login = require("../models/authSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const {username, password, role} = req.body;
    if(!username || !password || !role){
        return res.status(400).json({message: "Username, Password and role required."});
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const userInfo = {username, role, password: hash};
        const savedInfo = await Login.create(userInfo);
        const token = jwt.sign(
            {id: savedInfo._id, username: savedInfo.username, role: savedInfo.role},
            process.env.JWT_SECRET,
            {expiresIn: "23h"},
        );
        res.status(201).json({message: `${username} has been created`, token});
    }catch(error){
        res.status(500).json({message: "Server Error", error});
    }
}


exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password required" });
    }
    try {
        const user = await Login.findOne({ username }).select("+password");
        if (!user) {
            return res.status(404).json({ message: `${username} not found, try again` });
        }
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            return res.status(401).json({ message: "Unauthorized Try Again" });
        }
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "23h" }
        );

        
        res.status(200).json({
            message: `${username} has been logged in`,
            token,
            role: user.role,
            userId: user._id, 
        });
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error });
    }
};

exports.checkToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Unathorized"});
    }
    const token = authHeader.split(" ")[1];
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken){
            return res.status(401).json({message: "Token Error"});
        }
        req.user = decodedToken;
        next();
    }catch(error){
        res.status(401).json({message: "Error with authorization token", error});
    }
}