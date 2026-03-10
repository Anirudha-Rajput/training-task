const JWT = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            })
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        req.user=decoded;

        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "invalid token"
        })
    }
}
module.exports=authMiddleware