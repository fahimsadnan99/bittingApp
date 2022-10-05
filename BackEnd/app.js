const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv").config();
const User = require("./Routes/UserRouter");
const Card = require("./Routes/CardRouter")


const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/upload", express.static(path.join(__dirname, "images")));

app.use("/api/user", User);
app.use("/api/card",Card)
// app.use("/api/profile", Profile);





module.exports = app;