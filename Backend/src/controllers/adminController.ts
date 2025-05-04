import type { Request, Response } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { IAdminService } from "../domain/interface/Admin/IAdminService";
import { inject, injectable } from "inversify";

@injectable()
export class AdminController {
  constructor(@inject("IAdminService") private _adminService: IAdminService) {}

  login = async (req: Request, res: Response) => {
    try {
      const data = await this._adminService.findAdmin(req.body);

      console.log("admin found:", data);
      if (!data) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server Error" });
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

        res
          .status(HttpStatusCode.OK)
          .json({ message: "Admin login successfull", data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getAllusers = async (req: Request, res: Response) => {
    try {
      const users = await this._adminService.findUsers();

      if (!users) {
        res.status(HttpStatusCode.NOT_FOUND).json("No users found");
      } else {
        res.status(HttpStatusCode.OK).json(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  userDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await this._adminService.findUser(id);

      if (!user) {
        res.status(HttpStatusCode.NOT_FOUND).json("user not found");
      } else {
        res.status(HttpStatusCode.OK).json(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  blockUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const blocked = await this._adminService.blockUser(id);

      console.log("blocked:", blocked);
      if (blocked) {
        res
          .status(HttpStatusCode.OK)
          .json({ Message: "userblocked successfully", blocked });
      } else {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json("Internal server  error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  unblockUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const unBlock = await this._adminService.unBlockUser(id);

      if (unBlock) {
        res.status(HttpStatusCode.OK).json({ message: "Unblocked ", unBlock });
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
