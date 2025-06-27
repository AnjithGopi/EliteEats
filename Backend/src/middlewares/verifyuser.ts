import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authVerfication";
import { HttpStatusCode } from "../utils/statusCodes";
import { Roles } from "../utils/roles";

export const verifyUser = async (
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
    } else if (user.role !== Roles.USER) {
      res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: "Access allowed only to users" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
