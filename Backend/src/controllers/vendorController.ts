import type { Request, Response } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { injectable, inject } from "inversify";
import { IVendorService } from "../interface/Vendor/IVendorService";
import { IUserOrderService } from "../interface/User/IUserOrderService";
import { CookieMaxAge } from "../utils/cookieMaxage";

@injectable()
export class VendorController {
  constructor(
    @inject("IVendorService") private _vendorService: IVendorService,
    @inject("IUserOrderService") private _userOrderService: IUserOrderService
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
      const { otp, token, image } = req.body;
      console.log("image:", image);
      const data = await this._vendorService.verifyOtp(otp, token, image);
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
          sameSite: "lax",
          secure: true,
          maxAge: CookieMaxAge.AccessToken,
        });

        res.cookie("RefreshToken", data.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          maxAge: CookieMaxAge.RefreshToken,
        });

        res
          .status(HttpStatusCode.OK)
          .json({ message: "login successfull", ...data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  createMenu = async (req: Request, res: Response) => {
    try {
      console.log("items to create Menu:::::::>>>", req.body);
      const menu = await this._vendorService.addMenu(req.body);

      if (menu) {
        res
          .status(HttpStatusCode.CREATED)
          .json({ message: "item added successfully", menu });
      } else {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "internal server error" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  createCategory = async (req: Request, res: Response) => {
    try {
      const { name, hotelId } = req.body;

      console.log("data:::", req.body);

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

  getCategories = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const categories = await this._vendorService.fetchCategories(id);
      if (!categories) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "Categories not found" });
      } else {
        res.status(HttpStatusCode.OK).json(categories);
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

  getMenu = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const menu = await this._vendorService.fetchMenu(id);

      if (!menu) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: "No menu found" });
      } else {
        res.status(HttpStatusCode.OK).json(menu);
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      console.log("inside controller to delete category");
      const { id } = req.params;

      const deleted = await this._vendorService.handleCategoryDeletion(id);
      if (!deleted) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server Error" });
      } else {
        res
          .status(HttpStatusCode.OK)
          .json({ message: "Category Deleted Successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  viewAllOrders = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const orders = await this._vendorService.orderManagement(id);
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

  findOrder = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const order = await this._vendorService.getOrder(id);

      if (!order) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: " Not found" });
      } else {
        res.status(HttpStatusCode.OK).json(order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchOrders = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const orders = await this._userOrderService.fetchOrders_with_Id(id);

      if (!orders) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ success: false, message: "No orders found" });
      } else {
        res.status(HttpStatusCode.OK).json({
          success: true,
          message: "Orders Fetched Successfully",
          orders,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const passwordReset = this._vendorService.resetPassword(email);

      if (!passwordReset) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: "Error in changing Password" });
      } else {
        res
          .status(HttpStatusCode.OK)
          .json({ success: true, message:"user found" });
      }
    } catch (error) {
      console.log(error);
    }
  };

   resetPassword = async (req: Request, res: Response) => {
    try {
      console.log("Worked");
      const { token } = req.params;
      const { password, confirmPassword } = req.body;

      let verified;

      if (password === confirmPassword) {
        verified = await this._vendorService.verifyAndResetPassword(
          token,
          password
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
