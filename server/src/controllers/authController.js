const userModel = require("../models/user.model");
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken");
const {transporter}  = require("../services/email.service");

const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.status(400).json({
            message: "all fields required"
        })
        let existingUser = await userModel.findOne({ email })
        if (existingUser) return res.status(409).json({
            message: "user already exist please login"
        })
        let hashedPass = await bcrypt.hash(password, 10)
        const verifyToken = JWT.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        const newUser = await userModel.create({ name, email, password: hashedPass, verifyToken })
        const verifyLink = `http://localhost:3000/api/auth/verify/${verifyToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Verify Your Email",
            html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email</p>
      <a href="${verifyLink}">Verify Email</a>
      `
        });
        if (newUser) return res.status(201).json({
            success: true,
            message: "user registered",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
           
        })

    } catch (error) {
        console.log("error in creating", error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error
        })
    }
}

const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (!user.isVerified) {
            return res.status(401).send({
                success: false,
                message: "Please verify your email first"
            });
        }
        // compare password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        // create token
        const token = JWT.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log("Login Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



const verifyEmailController = async (req, res) => {

    try {

        const { token } = req.params;

        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).send("Invalid token");
        }

        user.isVerified = true;
        user.verifyToken = null;

        await user.save();

        res.send("Email verified successfully");

    } catch (error) {
        res.status(400).send("Verification failed");
    }
};

module.exports = { registerController, loginController, verifyEmailController };
