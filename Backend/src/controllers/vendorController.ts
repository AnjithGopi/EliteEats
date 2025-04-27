import type { Request, Response } from "express";
import VendorServices from "../services/vendorService.ts";

class VendorController {
  private vendorService: VendorServices;

  constructor() {
    this.vendorService = new VendorServices();
  }

  signup = async (req: Request, res: Response) => {
    try {
      let data = await this.vendorService.register(req.body);

      if (data) {
        res.status(201).json({ message: "Registration successfull", data });
      }

      res.status(500).json("Internal server error");
    } catch (error) {
      console.log(error);
    }
  };


  login= async(req:Request,res:Response)=>{

    try {

        const data= await this.vendorService.login(req.body)

        if(!data){
            res.status(500).json("Internal server Error")
        }else{

        
            res.cookie("AccessToken", data.accessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge: 60 * 60 * 1000,
            });
    
            res.cookie("RefreshToken", data.refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
              maxAge:  7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({message:"login successfull",data})
        }

        
        
    } catch (error) {
        console.log(error)
        
    }
  }
}

export default new VendorController();
