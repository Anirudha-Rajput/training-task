const express = require("express");
const router = express.Router();
const { profileController } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const userModel = require("../models/user.model");


router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId).select("name email");
     
        return res.status(200).json({
            success: true,
            user: user

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}
);

module.exports = router;