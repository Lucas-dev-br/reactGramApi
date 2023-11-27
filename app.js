require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

// Configurar Json and formData response
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
const router = require("./routes/Router")
app.use(router);

// Cors
app.use(cors({credentials: true, origin: "http://localhost:5000"}))

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB Connection
require("./config/db.js")

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})