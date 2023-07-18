import UserModel from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';
import userModel from "../model/user.model.js";
import otpGenerator from 'otp-generator';

// Middleware for verify user
const verifyUser = async (req, res, next) => {
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // Check the User Existance
        let exist = await UserModel.findOne({username});
        if (!exist) {
            return res.status(404).send({error : "Can't Find User"});
        }
        next();

    } catch (error) {
        return res.status(404).send({ error : "Authentication Error"})
    }
}

// Post Methods
const register = async (req, res) => {
    try {
        const { username, password, profile, email } = req.body;

        // check the username existance
        const existName = await UserModel.findOne({username});
        if (existName) {
            return res.send("Please Choose Unique UserName")
        }

        // check the user email existance
        const existEmail = await UserModel.findOne({email});
        if (existEmail) {
            return res.send("User Exist with this Email")
        }

        const user = await UserModel.create({
            username,
            password,
            profile,
            email
        });

        await user.save();

        res.status(200).json({
            success : true,
            message : "User Registration Successfull",
            user
        })
        
    } catch (error) {
        return res.status(500).send("Some Problem Occured");
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
          return res.status(401).send("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(401).send("Invalid credentials");
        }

        // Creating JWT token
        const token = jwt.sign({
            userId : user._id,
            username : user.username,
        }, ENV.JWT_SECRET , {expiresIn : "24h"})

        res.status(200).send({
            message : "Login Successfull",
            username : user.username,
            token
        })

    } catch (error) {
        return res.status(500).send("Some Error Occured! Try Again")
    }
};

const registerMail = async (req, res) => {
    
};

const authenticate = async (req, res) => {
    res.end();
};

// get Methods
const user = async (req, res) => {
    const { username } = req.params;

    try {
        if (!username) {
            return res.status(500).send({ error : "Invalid Username"})
        }

        const user = await userModel.findOne({username});
        if (!user) {
            return res.status(500).send({error : "User Not Found"})
        }
        user.password = undefined;
        res.status(200).send({
            success : true,
            message : "User Details",
            user
        })
    } catch (error) {
        res.status(404).send({error : "Can not Find User Data"})
    }
};

const generateOTP = async (req, res) => {
    req.app.locals.OTP = await otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})

    res.status(200).send({
        success: true,
        message: "Successfully OTP is Created",
        code: req.app.locals.OTP
    })

};

const verifyOTP = async (req, res) => {
    const {code} = req.query;

    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;              // Reset the OTP value
        req.app.locals.resetSession = true;     // Start session for reset password
        return res.status(200).send({
            success: true,
            message: "Verify Successfully"
        })
    }
    res.status(400).send({error : "Invalid OTP"})
};

const createResetSession = async (req, res) => {
    if (req.app.locals.resetSession) {
        req.app.locals.resetSession = false    // allow access to this route only once
        return res.status(200).send({message: "Access Granted"})
    }
    res.status(440).send({message: "Session Expired!"});
};

// Put Methods
const updateuser = async (req, res) => {
    try {
        // const id = req.query.id;
        const { userId } = req.user;

        if (userId) {
            const body = req.body;

            // updating user info
            const updatedUser = await UserModel.updateOne({_id : userId}, body)

            res.status(200).send({
                success : true,
                message : "User Data Successfully Updated",
                updatedUser
            });
            
        } else {
            return res.status(404).send({error : "User Not Found!"})
        }

    } catch (error) {
        return res.status(404).send({error : "Something Gone Wrong"})
    }
};

const resetPassword = async (req, res) => {
    try {

        if (!req.app.locals.resetSession) {
            res.status(440).send({message: "Session Expired!"});
        }

        const { username, password } = req.body;

        try {
            const user = await UserModel.findOne({username});
            if (!user) {
                res.send(404).send({error : "Username Not Found"});
            }
            const hashPassword = await bcrypt.hash(password, 8);

            const updatedPassword = await UserModel.updateOne({username : user.username}, {password : hashPassword});

            req.app.locals.resetSession = false;    // Reset Session

            res.status(200).send({
                success : true,
                message : "Password Successfully Reset",
                updatedPassword
            });

        } catch (error) {
            return res.status(401).send({error : "Something Wrong"});
        }
        
    } catch (error) {
        return res.status(401).send({error : "Some Error Occured, Pls Try Again!"});
    }
};


export  {
    register,
    registerMail,
    authenticate,
    login,
    user,
    generateOTP,
    verifyOTP,
    createResetSession,
    updateuser,
    resetPassword,
    verifyUser
}
