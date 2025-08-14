import { inject, injectable } from "inversify";
import { IUserOrderService } from "../interface/User/IUserOrderService";
import { IOrderRepository } from "../interface/Orders/IOrderRepository";

@injectable()
export class UserOrderService implements IUserOrderService {
  constructor(
    @inject("IOrderRepository") private _orderepository: IOrderRepository
  ) {}

  createOrder = async (data: any) => {
    try {
      console.log("data for order placement:", data);
      const {
        address,
        deliveryInstructions,
        deliveryfee,
        hotelId,
        lat,
        lng,
        paymentMethod,
        products,
        subtotal,
        tax,
        totalAmount,
        userId,
      } = data;

      const orderData = {
        userId,
        products,
        hotelId,
        totalAmount,
        paymentMethod,
        address,
        deliveryInstructions,
        deliveryfee,
        latitude: lat,
        longitude: lng,
        subtotal,
        tax,
      };

      return await this._orderepository.createOrderRepo(orderData);
    } catch (error) {
      console.log(error);
    }
  };

  fetchOrders_with_Id = async (id: string) => {
    try {
      const orders = await this._orderepository.findOrdersFromRestaurent(id);
      console.log("orders:", orders);
      return orders;
    } catch (error) {
      console.log(error);
    }
  };

  fetchOrders = async (id: string) => {
    try {
      const orders = await this._orderepository.findOrdersOfUser(id);

      console.log(orders);
      return orders;
    } catch (error) {
      console.log(error);
    }
  };
}
