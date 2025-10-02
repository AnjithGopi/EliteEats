import type { Request, Response } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { IAdminService } from "../interface/Admin/IAdminService";
import { inject, injectable } from "inversify";
import { CookieMaxAge } from "../utils/cookieMaxage";

@injectable()
export class AdminController {
  constructor(@inject("IAdminService") private _adminService: IAdminService) {}

  login = async (req: Request, res: Response) => {
    try {
      const data = await this._adminService.findAdmin(req.body);

      console.log("admin found:", data);
      console.log("data.accesstoken:", data.accessToken);
      if (!data) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server Error" });
      } else {
        res.cookie("AccessToken", data.accessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge:CookieMaxAge.AccessToken
        });

        res.cookie("RefreshToken", data.refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          maxAge: CookieMaxAge.RefreshToken
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
        console.log("users returned");
        res.status(HttpStatusCode.OK).json(users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  userDetails = async (req: Request, res: Response) => {
    try {
      console.log("user Search");
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

  getRestuarentList = async (req: Request, res: Response) => {
    try {
      const restaurentsFound = await this._adminService.getRestaurents();

      if (!restaurentsFound) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "No restaurents found" });
      } else {
        res.status(HttpStatusCode.OK).json(restaurentsFound);
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyRestaurent = async (req: Request, res: Response) => {
    try {
      console.log("verification controller worked");
      const { id } = req.params;

      const restuarent = await this._adminService.findRestaurent(id);

      if (!restuarent) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      } else {
        res
          .status(HttpStatusCode.OK)
          .json({ message: "Restaurent verified successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getAllOrders = async (req: Request, res: Response) => {
    try {
      const orders = this._adminService.getOrders();

      if (!orders) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "No orders found" });
      } else {
        res.status(HttpStatusCode.OK).json(orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getAllRiders = async (req: Request, res: Response) => {
    try {
      const riders = await this._adminService.findAllRiders();
      if (!riders) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "no riders found" });
      } else {
        res.status(HttpStatusCode.OK).json(riders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  viewUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await this._adminService.findRider(id);

      if (!user) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "user not found" });
      } else {
        res.status(HttpStatusCode.OK).json(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyRider = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const verified = await this._adminService.updateRider(id);

      if (!verified) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Something went wrong!" });
      } else {
        res
          .status(HttpStatusCode.OK)
          .json({ message: "Verified successfully", verified });
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
        .json({ message: "Logged out successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  rejectRider=async(req:Request,res:Response)=>{

    try {

      console.log("Reject rider worked")

      const {id}=req.params

      const{reason}=req.body

      const rejected=await this._adminService.rejectRiderRequest(id,reason)

      if(!rejected){
        res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json({message:"!something went wrong"})
      }else{
        res.status(HttpStatusCode.OK).json({message:"Application rejected"})
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }
}
