const express = require("express")
const router = express();
const userRoute = require("./UserRoutes")
const photosRoute = require("./PhotoRoutes")

router.use("/api/users", userRoute)
router.use("/api/photos", photosRoute)


router.get("/", (req, res) => {
    res.send("API FUNCIONANDO")
})

module.exports = router