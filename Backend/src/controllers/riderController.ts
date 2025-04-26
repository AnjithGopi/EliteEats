import { json, type Request, type Response } from "express";
import RiderService from "../services/riderService.ts";

class RiderController {
  private RiderService: RiderService;

  constructor() {
    this.RiderService = new RiderService();
  }

  signup = async (req: Request, res: Response) => {
    try {
      const data = await this.RiderService.register(req.body);

      data
        ? res.status(200).json(data)
        : res.status(500).json("Internal server error");
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const data = await this.RiderService.verifyOtp(req.body);

      if (data) {
        res
          .status(201)
          .json({ message: "Delivery Partner Registered succesfully", data });
      } else {
        res.status(500).json("Internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const user = await this.RiderService.verifyLogin(req.body);

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
    } catch (error) {}
  };
}

export default new RiderController();
