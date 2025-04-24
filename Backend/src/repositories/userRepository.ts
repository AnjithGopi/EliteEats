
import User from "../models/userModel.ts"


class UserRepository{

    constructor(){

    }



    checkExists=async(userData)=>{

        try {
            const exists=await User.findOne({

                $or:[
     
                 {email:userData.email},
                 {mobile:userData.mobile},
                 {isVerified:true}
                ]
                    
             })
     
            return exists
            
        } catch (error) {
            console.log(error)
            
        }

        
        

    }


    saveUser=async(userData)=>{

        try {

            const user= await User.create(userData)
            console.log("user saved without verification :",user)
            return user.save()

        
            
        } catch (error) {

            console.log(error)
            
        }
    }


}




export default UserRepository



