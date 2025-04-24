
import UserRepository from "../repositories/userRepository.ts"
import generateOtp from "../utils/generateOtp.ts"


class UserService{

    private userRepository:UserRepository

    constructor(){

        this.userRepository= new UserRepository()


    }


    register =async(userData)=>{

        try {

            const existingUser=await this.userRepository.checkExists(userData)

        if(existingUser){
            throw new Error("User already exists")
        }

        const otp=generateOtp()
        



            
        } catch (error) {
            console.log(error)
            
        }



    }




}






export default UserService