import { json, type Request, type Response } from "express";
import RiderService from "../services/riderService.ts";

class RiderController {
  private RiderService: RiderService;

  constructor() {
    this.RiderService = new RiderService();
  }

  signup = async (req: Request, res: Response) => {
    try {
      const data = await this.RiderService.register(req.body);

      data
        ? res.status(200).json(data)
        : res.status(500).json("Internal server error");
    } catch (error) {
      console.log(error);
    }
  };


  verifyOtp= async(req:Request,res:Response)=>{

    try {

        const data= await this.RiderService.verifyOtp(req.body)
      
        
        if(data){
            
            res.status(201).json({message:"Delivery Partner Registered succesfully",data})
        }else{

            res.status(500).json("Internal server error")
        }

        

    } catch (error) {
        console.log(error)
        
    }
  }



}

export default new RiderController();
