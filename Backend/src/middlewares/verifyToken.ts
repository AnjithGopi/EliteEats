import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { env } from "../config/env";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
):void => {
  try {
    console.log("Token verification started")
    console.log("Middle ware worked")
    console.log("Token in cookies Access:",req.cookies.AccessToken)
    const token = req.cookies.AccessToken;
   

    if (!token) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Access Token Not found" });
        return 
    }

    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

    req.user = decoded; //// Store user payload in request for later use
    next();
  } catch (error) {
    console.log(error);
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "Invalid or Expired token" });
  }
};
