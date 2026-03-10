const express=require("express")
const router=express.Router()
const { registerController, loginController, profileController, verifyEmailController } = require("../controllers/authController")
const authMiddleware = require("../middleware/auth.middleware")


router.post("/register", registerController)
router.post("/login",loginController)

router.get("/verify/:token", verifyEmailController);
module.exports=router;