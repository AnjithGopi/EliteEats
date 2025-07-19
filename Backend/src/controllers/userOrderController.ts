import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/statusCodes";
import { injectable, inject } from "inversify";
import { IUserService } from "../interface/User/IUserService";

@injectable()
export class UserOrderController {
  constructor(@inject("IUserService") private _userService: IUserService) {}

  getItemDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const item = await this._userService.itemDetail(id);

      if (!item) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "Item not found" });
      } else {
        res.status(HttpStatusCode.OK).json(item);
      }
    } catch (error) {
      console.log(error);
    }
  };

  instantOrder = async (req: Request, res: Response) => {
    try {
      console.log("the parameters passed for ordering:", req.body);

      const order = await this._userService.createOrder(req.body);

      if (!order) {
        res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal Server Error" });
      } else {
        res
          .status(HttpStatusCode.CREATED)
          .json({ message: "Order Placed Successfully", order });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getOrders = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const orders = await this._userService.fetchOrders(id);

      if (!orders) {
        res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ message: "No orders found " });
      } else {
        res.status(HttpStatusCode.OK).json(orders);
      }
    } catch (error) {
      console.log(error);
    }
  };
}
