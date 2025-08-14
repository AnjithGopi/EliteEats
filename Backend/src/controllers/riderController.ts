import { json, type Request, type Response } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { inject, injectable } from "inversify";
import { IRiderService } from "../interface/Rider/IRiderService";

@injectable()
export class RiderController {
  constructor(@inject("IRiderService") private _riderService: IRiderService) {}

  signup = async (req: Request, res: Response) => {
    try {
      const data = await this._riderService.register(req.body);

      data
        ? res.status(HttpStatusCode.OK).json(data)
        : res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const { otp, token } = req.body;
      const data = await this._riderService.verifyOtp(otp, token);

      if (data) {
        res
          .status(HttpStatusCode.CREATED)
          .json({ message: "Delivery Partner Registered succesfully", data });
      } else {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json("Internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const user = await this._riderService.verifyLogin(req.body);

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
        console.log("should handle tokens in cookies");
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyProfile = async (req: Request, res: Response) => {
    try {
      console.log("data for verification:", req.body);

      const submitted = await this._riderService.submitForVerification(
        req.body
      );

      if (!submitted) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      } else {
        res
          .status(HttpStatusCode.CREATED)
          .json({ message: "Data submitted succesfully", submitted });
      }
    } catch (error) {
      console.log(error);
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      res.clearCookie("AccessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      res.clearCookie("RefreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      res
        .status(HttpStatusCode.OK)
        .json({success:true, message: "Logged out successfully" });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong in logout" });
    }
  };
}
