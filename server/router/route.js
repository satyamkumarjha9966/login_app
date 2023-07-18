import { Router } from "express";
import {register, registerMail, authenticate, login, user, generateOTP, verifyOTP, createResetSession, updateuser, resetPassword, verifyUser} from '../controllers/appController.js'
import auth, {localVariables} from "../middleware/auth.js";
const router = Router();

// Post Methods
router.post('/register', register);

router.post('/registerMail', registerMail);

router.post('/authenticate', authenticate);

router.post('/login', verifyUser, login);

// get Methods
router.get('/user/:username', user);

router.get('/generateOTP', verifyUser, localVariables, generateOTP);

router.get('/verifyOTP', verifyUser, verifyOTP);

router.get('/createResetSession', createResetSession);

// Put Methods
router.put('/updateuser', auth, updateuser);

router.put('/resetPassword', verifyUser, resetPassword);

export default router;


