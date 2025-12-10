import express from 'express'
import  * as auth from '../controllers/auth.controller.js';

const authRoute = express.Router();

authRoute.post('/pre-signup', auth.preSignup)
authRoute.post('/signup', auth.signup)
authRoute.post('/login', auth.login)

export default authRoute;