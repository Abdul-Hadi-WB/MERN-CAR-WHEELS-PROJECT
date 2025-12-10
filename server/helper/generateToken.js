import { JWT_SECRET } from "../config/config.js";
import jwt from 'jsonwebtoken'


const generateToken =  (req, res, user) => {
         try {
                   const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "1d"})
                   const refreshToken = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "30d"})

                   user.password = undefined
                   user.reset_password_code = undefined

                   return res.json({
                       token, 
                       refreshToken,
                       user
                   })
         } catch(err){
                        return res.json({error: err.message})
         }
}

export default generateToken