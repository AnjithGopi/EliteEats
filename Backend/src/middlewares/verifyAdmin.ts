import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { AuthenticatedRequest } from "./authVerfication";
import { Roles } from "../utils/roles";

export const verifyAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  try {
    if (!user) {
      console.log("No user found error in admin verification");
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Unauthorized Access" });
    } else if (user.role !== Roles.ADMIN) {
      console.log("logged user is not admin");
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Access allowed only for Admin" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
