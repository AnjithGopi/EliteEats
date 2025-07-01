import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { env } from "../config/env";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

const verify = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.AccessToken;

    if (!token) {
      res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: "No Accesstoken cookie found" });
    } else {
      console.log("token found:", token);
      const decoded = Jwt.verify(token, env.JWT_ACCESS_SECRET);

      console.log("typeof decoded:", typeof decoded);

      req.user = decoded;
      console.log("role:", req.user.role);

      next();
    }
  } catch (error) {
    console.log("Unauthorized");
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "No token found, Authentication failed" });
  }
};

export default verify;
