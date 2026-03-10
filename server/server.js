require("dotenv").config()
const connectDB = require("./src/config/db")
const express = require("express");
const app = express()
const cors=require("cors")
app.use(cors())
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const PORT = process.env.PORT || 4500

app.use(express.json())

connectDB();

app.use("/api/auth/", authRoutes)
app.use("/api/user/", userRoutes)

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
})