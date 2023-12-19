require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT;

const app = express();

// Configurar Json and formData response
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Cors
app.use(cors({credentials: true, origin: "http://localhost:3000"}))

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB Connection
require("./config/db.js")

// Routes
const router = require("./routes/Router")
app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})