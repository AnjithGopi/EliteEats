import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { env } from "../config/env";
// import User from "../models/userModel";
// // import jwt_decode from "jwt-decode"
// import jwt_decode from "jwt-decode"

interface AuthenticatedRequest extends Request {
  user?: any;
}

const verify = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("token verification started");
    const token = req.cookies.AccessToken;

    const decoded = Jwt.verify(token, env.JWT_ACCESS_SECRET);
    console.log("decoded user from token:", decoded);

    req.user = decoded;

    console.log("req.user attached:", req.user, decoded);
    next();
  } catch (error) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "No token found, Authentication failed" });
  }
};

export default verify;
