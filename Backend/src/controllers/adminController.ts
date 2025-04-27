import type { Request, Response } from "express";

import AdminService from "../services/adminServices.ts";

class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const data = await this.adminService.findAdmin(req.body);

      console.log("admin found:", data);
      if (!data) {
        res.status(500).json({ message: "Internal server Error" });
      } else {
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
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Admin login successfull", data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getAllusers = async (req: Request, res: Response) => {
    try {
      const users = await this.adminService.findUsers();

      if (!users) {
        res.status(404).json("No users found");
      } else {
        res.status(200).json(users);
      }
    } catch (error) {}
  };

  userDetails=async(req:Request,res:Response)=>{

    try {

      const {id}=req.params

      const user= await this.adminService.findUser(id)

      if(!user){
        res.status(404).json("user not found")
      }else{

        res.status(200).json(user)
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }

  blockUser= async(req:Request,res:Response)=>{
    try {

       const{id}=req.params

       const blocked =await this.adminService.blockUser(id)

       console.log("blocked:",blocked)
       if(blocked){

        res.status(200).json({Message:"userblocked successfully",blocked})

       }else{
        res.status(500).json("Internal server  error")
       }
       
      
    } catch (error) {
      console.log(error)
      
    }
  }
}

export default new AdminController();
