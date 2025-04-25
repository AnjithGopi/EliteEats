
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export const generateToken=(userData)=>{

    try {

        console.log("token generation started with user:",userData)

        const payLoad={ // creating payload with user information 
            id:userData._id,
            username:userData.name
        }
        // sign the token with payload , secret key and expiration time 

        console.log("Acces token generated:",jwt.sign(payLoad,process.env.JWT_SECRET,{expiresIn:"1h"}))

        return jwt.sign(payLoad,process.env.JWT_SECRET,{expiresIn:"1h"})

        
        
    } catch (error) {

        console.log(error)
        
    }

}