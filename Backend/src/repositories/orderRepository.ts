import { IOrderRepository } from "../interface/Orders/IOrderRepository";
import Order from "../models/orderModel";

export class OrderRepository implements IOrderRepository {
  constructor() {}

  createOrderRepo = async (orderData: any) => {
    try {
      const order = new Order(orderData);
      return await order.save();
    } catch (error) {
      console.log(error);
    }
  };

  findOrdersFromRestaurent = async (id: string) => {
    try {
      return await Order.find({ hotelId: id }).sort({createdAt:-1});
    } catch (error) {
      console.log(error);
    }
  };

  findOrdersOfUser = async (id: string) => {
    try {
      const orders = await Order.find({ userId: id }).sort({
        createdAt: -1,
      });
      console.log("orders found for user:", orders);
      return orders;
    } catch (error) {
      console.log(error);
    }
  };


}
