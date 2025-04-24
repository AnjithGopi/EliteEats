
import User from "../models/userModel.ts"


class UserRepository{

    constructor(){

    }



    checkExists=async(userData)=>{

        const exists=await User.findOne({

           $or:[

            {email:userData.email},
            {mobile:userData.mobile}
           ]
               
        })

       return exists
        

    }


}




export default UserRepository



