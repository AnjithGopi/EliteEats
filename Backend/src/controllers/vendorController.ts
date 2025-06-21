import type { Request, Response } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { injectable, inject } from "inversify";
import { IVendorService } from "../interface/Vendor/IVendorService";

@injectable()
export class VendorController {
  constructor(
    @inject("IVendorService") private _vendorService: IVendorService
  ) {}

  signup = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      console.log("registration started for restuaruet");
      let data = await this._vendorService.register(req.body);

      if (data) {
        res
          .status(HttpStatusCode.CREATED)
          .json({ message: "Registration successfull", data });
      } else {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json("Internal server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const { otp, token } = req.body;
      const data = await this._vendorService.verifyOtp(otp, token);
      if (data) {
        console.log("Hotel registered");
        res
          .status(HttpStatusCode.CREATED)
          .json({ message: "Registration successfull ", data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const data = await this._vendorService.login(req.body);
      console.log(data);

      if (!data) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json("Internal server Error");
      } else {
        res.cookie("AccessToken", data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 1000,
        });

        res.cookie("RefreshToken", data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "login successfull", data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  createMenu = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      console.log(req.body.id);
      const menu = await this._vendorService.addMenu(req.body);

      if (menu) {
        res.status(201).json({ message: "item added successfully", menu });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  createCategory = async (req: Request, res: Response) => {
    try {
      console.log(req.body);

      const category = await this._vendorService.addCategory(req.body);

      if (!category) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server Error" });
      } else {
        res
          .status(HttpStatusCode.CREATED)
          .json({ message: "Category saved successfully", category });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
