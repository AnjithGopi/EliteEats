
import Otp from "../models/otpModel.ts"


class OtpRepository{

    constructor(){

    }


    createOtp=async(email,otp)=>{

        console.log("email in otp repository:",email)
        console.log("otp in otp repository:",otp)


       return  await Otp.create({
            email:email,
            otp:otp
           })

  



    }





}



export default OtpRepository