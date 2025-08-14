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
      return await Order.find({ hotelId: id });
    } catch (error) {
      console.log(error);
    }
  };

  findOrdersOfUser = async (id: string) => {
    try {
      return await Order.find({ userId: id });
    } catch (error) {
      console.log(error);
    }
  };
}
