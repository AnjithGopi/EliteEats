import Jwt, { decode } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { env } from "../config/env";
import User from "../models/userModel";
import Vendor from "../models/vendorModel";
import Rider from "../models/riderModel";

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
      const decoded: any = Jwt.verify(token, env.JWT_ACCESS_SECRET);

      console.log("decoded:", decoded);

      const results = await Promise.all([
        User.findOne({ _id: decoded.id }),
        Vendor.findOne({ _id: decoded.id }),
        Rider.findOne({ _id: decoded.id }),
      ]);

      console.log("REsults::", results);

      const user = results.find((u) => u !== null);

      console.log("USER FOUND::::::::::", user);
      console.log("role:--------------------", decoded.role);

      if (!user) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: "Bad request" });
      } else {
        if (user.isActive === false) {
          console.log("user active false");
          res.clearCookie("AccessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          res.status(403).json({ message: "Your Profile is Blocked by admin" });
        } else {
          req.user = { ...user.toObject(), role: decoded.role };

          console.log("REQ.user----", req.user);

          next();
        }
      }
    }
  } catch (error) {
    console.log("Unauthorized");
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "No token found, Authentication failed" });
  }
};

export default verify;
