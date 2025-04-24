
import type {Request,Response} from "express"
import UserService from "../services/userService.ts"


class userController{

    private userService:UserService

    constructor(){

        this.userService = new UserService()

    }

   


    userSignup=async(req:Request,res:Response)=>{

        try {

            let data=await this.userService.register(req.body)

            if(data){
                console.log("data recieved in controller :",data)
            }
           
            
           
            
        } catch (error) {
            console.log(error)
            
        }
    }


}

export default new userController()