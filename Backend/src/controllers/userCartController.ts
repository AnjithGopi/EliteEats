import type { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IUserService } from "../interface/User/IUserService";
import { IUserCartService } from "../interface/User/IUserCartService";
import { HttpStatusCode } from "../utils/statusCodes";

@injectable()
export class UserCartController {
  constructor(
    @inject("IUserCartService") private _userCartService: IUserCartService
  ) {}

   addtoCart = async (req: Request, res: Response) => {
    try {
      const { userId, productId,hotelId, quantity, price } = req.body;

      if (!userId || !productId || !quantity || !price) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Missing required fields",
        });
      }

      const cart = await this._userCartService.cartImplementation(
        userId,
        productId,
        hotelId,
        Number(quantity),
        Number(price)
      );

      res.status(HttpStatusCode.CREATED).json({
        message: "Added to cart",
        cart,
      });
    } catch (error: any) {
      console.error(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: error.message || "Failed to add to cart",
      });
    }
  };

  getCartDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const cart = await this._userCartService.findCart(id);

      if (!cart) {
        res.status(HttpStatusCode.NOT_FOUND).json({ message: "No cart found" });
      } else {
        res.status(HttpStatusCode.OK).json(cart);
      }
    } catch (error) {
      console.log(error);
    }
  };


  incrementItemInCart = async (req: Request, res: Response) => {
    try {
      console.log("items :", req.body);
      console.log("cart item updation worked");
      const { userId, itemId, quantity } = req.body;
      const updatedCart = await this._userCartService.updateQuantityinCart(
        userId,
        itemId,
        quantity
      );

      if (!updatedCart) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: "Unable to update quantity" });
      } else {
        res.status(HttpStatusCode.OK).json({
          success: true,
          message: "Quantity updated successfully",
          updatedCart,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  decrementItems = async (req: Request, res: Response) => {
    try {
      const { userId, itemId, quantity } = req.body;

      const updatedCart = await this._userCartService.decrementCartItems(
        userId,
        itemId,
        quantity
      );
      if (!updatedCart) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: "Unable to update Cart" });
      } else {
        res
          .status(HttpStatusCode.OK)
          .json({
            success: true,
            message: "Quantity decremented",
            updatedCart,
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
