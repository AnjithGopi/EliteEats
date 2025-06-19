import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { env } from "../config/env";
import User from "../models/userModel";
// import User from "../models/userModel";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const verify = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("All cookies:",req.cookies)
    
    console.log("token verification started");
    const token = req.cookies.AccessToken;

    if(!token){
        console.log("No accesstoken cookie found")
    }else{
        console.log("token found:",token)
    }

    const decoded = Jwt.verify(token, env.JWT_ACCESS_SECRET);
    console.log("decoded user from token:", decoded);

    console.log("typeof decoded:",typeof decoded)

   

    req.user = decoded;

   
    console.log("req.user attached:", req.user);
    next();
    
  } catch (error) {
    console.log("Unauthorized");
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "No token found, Authentication failed" });
  }
};

export default verify;
