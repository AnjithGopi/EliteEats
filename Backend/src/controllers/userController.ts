import type { Request, Response } from "express";
import UserService from "../services/userService.ts";
import dotenv from "dotenv";
dotenv.config();

class userController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  userSignup = async (req: Request, res: Response) => {
    try {
      let data = await this.userService.register(req.body);

      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const data = await this.userService.findUser(req.body);
      const user = await this.userService.verifyUser(data);
      res.status(201).json({ messsage: "User Registered Successfully", user });
    } catch (error) {
      console.log(error);
    }
  };

  userLogin = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.verifyLogin(req.body);

      if (user) {
        console.log(user);
        res.cookie("AccessToken", user.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });

        res.cookie("RefreshToken", user.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login Successfull", user });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default new userController();
