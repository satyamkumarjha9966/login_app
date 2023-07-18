import  jwt  from "jsonwebtoken";
import ENV from "../config.js"

// Auth Middleware
export default async function auth(req, res, next) {
    try {
        // Access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // Retrived the user details of login user

        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET)

        req.user = decodedToken;

        next();
        
    } catch (error) {
        res.status(500).json({error : "Authentication Failed"})
    }
}

// middle for local variables
export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }

    next();
}