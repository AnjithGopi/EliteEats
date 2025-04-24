
import UserRepository from "../repositories/userRepository.ts"
import generateOtp from "../utils/generateOtp.ts"
import sendOtp from "../utils/sendIOtp.ts"
import OtpRepository from "../repositories/otpRepository.ts"


class UserService{

    private userRepository:UserRepository
    private otpRepository :OtpRepository

    constructor(){

        this.userRepository= new UserRepository()
        this.otpRepository = new OtpRepository()


    }


    register =async(userData)=>{

        try {

            const existingUser=await this.userRepository.checkExists(userData)

        if(existingUser){
            throw new Error("User already exists")
        }

       let savedUser= await this.userRepository.saveUser(userData)

      

        const otp=generateOtp()

        if(savedUser){
            const saveOtp= await this.otpRepository.createOtp(savedUser.email,otp)
            await sendOtp(saveOtp.email,saveOtp.otp)

            return {message:"OTP send successfully"}

         }
                
        } catch (error) {
            console.log(error)
            
        }



    }




}






export default UserService