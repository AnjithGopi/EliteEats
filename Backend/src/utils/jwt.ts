import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { env } from "../config/env";
import { UserDetails } from "../interface/Admin/IAdminService";
import { Roles } from "./roles";
dotenv.config();

export const generateAccessToken = (userData:UserDetails, role: Roles) => {
  try {
    console.log("token generation with user:", userData);

    const payLoad = {
      id: userData._id,
      username: userData.name,
      role: role,
    };

    return jwt.sign(payLoad, env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (userData:UserDetails, role: Roles) => {
  try {
    console.log("refresh token generation with userData:", userData);

    const payLoad = {
      id: userData._id,
      username: userData.name,
      role: role,
    };
    return jwt.sign(payLoad, env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {}
};
