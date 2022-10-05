const express = require('express')
const { signin,signup } = require("../Controllers/userControllers")


const User = express.Router();

User.route("/signUp").post(signup);
User.route("/signIn").post(signin);

module.exports = User;