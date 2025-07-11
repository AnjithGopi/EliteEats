import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authVerfication";
import { HttpStatusCode } from "../utils/statusCodes";
import { Roles } from "../utils/roles";

export const verifyVendor = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  try {
    if (!user) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Unauthorized Access" });
    } else if (user.role !== Roles.RESTAURENT) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Access allowed only to Restuarent Admins" });
    } else {
      next();
    }
  } catch (error) {
    res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: "Unauthorized Access " });
    console.log(error);
  }
};
