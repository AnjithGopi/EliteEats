import type { Request, Response } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import dotenv from "dotenv";
dotenv.config();
import { injectable, inject } from "inversify";
import { IUserService } from "../domain/interface/User/IUserService";

@injectable()
export class userController {
  constructor(@inject("IUserService") private _userService: IUserService) {}

  userSignup = async (req: Request, res: Response) => {
    try {
      let data = await this._userService.register(req.body);

      console.log("Data from registration:",data)

      if (data) {
        res.status(HttpStatusCode.OK).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const data = await this._userService.findUser(req.body);
      const user = await this._userService.verifyUser(data);
      res
        .status(HttpStatusCode.CREATED)
        .json({ messsage: "User Registered Successfully", user });
    } catch (error) {
      console.log(error);
    }
  };

  userLogin = async (req: Request, res: Response) => {
    try {
      const user = await this._userService.verifyLogin(req.body);

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
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res
          .status(HttpStatusCode.OK)
          .json({ message: "Login Successfull", user });
      } else {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
