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

      console.log("Data from registration:", data);

      if (data) {
        res.status(HttpStatusCode.OK).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const { otp, token } = req.body;
      const data = await this._userService.verifyOtpAndRegister(otp, token);
      if (data) {
        console.log("USER Registered");
        res
          .status(HttpStatusCode.CREATED)
          .json({ messsage: "User Registered Successfully", data });
      } else {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  userLogin = async (req: Request, res: Response) => {
    try {
      const user = await this._userService.verifyLogin(req.body);
      console.log(req.body);

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

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const user = await this._userService.forgotPassword(email);

      if (!user) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: "No user Found" });
      } else {

        
        res.status(HttpStatusCode.OK).json({ message: "User found", user });
      }
    } catch (error) {
      console.log(error);
    }
  };

  resetPassword = async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      const { password, confirmPassword } = req.body;

      let verified;

      if (password === confirmPassword) {
        verified = await this._userService.verifyAndResetPassword(
          token,
          password,
          
        );
      } else {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json("Passwords do not match");
      }

      if (!verified) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json({ message: "Unable to verify the user" });
      } else {
        res
          .status(HttpStatusCode.OK)
          .json({ message: "Password Changed successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
