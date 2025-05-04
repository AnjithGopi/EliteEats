import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {env}from "../config/env"
import {  UserDetails } from "../domain/interface/Admin/IAdminService";
dotenv.config();

export const generateAccessToken = (userData:any) => {
  try {
    console.log("token generation with user:", userData);

    const payLoad = {
      id: userData._id,
      username: userData.name,
    };

    return jwt.sign(payLoad, env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (userData:any)=> {
  try {
    console.log("refresh token generation with userData:", userData);

    const payLoad = {
      id: userData._id,
      username: userData.name,
    };
    return jwt.sign(payLoad, env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });
  } catch (error) {}
};
