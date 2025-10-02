import { inject, injectable } from "inversify";
import { IUserOrderService } from "../interface/User/IUserOrderService";
import { IOrderRepository } from "../interface/Orders/IOrderRepository";

@injectable()
export class UserOrderService implements IUserOrderService {
  constructor(
    @inject("IOrderRepository") private _orderRepository: IOrderRepository
  ) {}

  // createOrder = async (data: any) => {
  //   try {
  //     console.log("data for order placement:", data);
  //     const {
  //       address,
  //       deliveryInstructions,
  //       deliveryfee,
  //       hotelId,
  //       lat,
  //       lng,
  //       paymentMethod,
  //       products,
  //       subtotal,
  //       tax,
  //       totalAmount,
  //       userId,
  //     } = data;

  //     const orderData = {
  //       userId,
  //       products,
  //       hotelId,
  //       totalAmount,
  //       paymentMethod,
  //       address,
  //       deliveryInstructions,
  //       deliveryfee,
  //       latitude: lat,
  //       longitude: lng,
  //       subtotal,
  //       tax,
  //     };

  //     return await this._orderepository.createOrderRepo(orderData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


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
      items, // <-- coming from frontend
      subtotal,
      tax,
      totalAmount,
      userId,
    } = data;

    const orderData = {
      userId,
      products: items,  // <-- map items → products
      hotelId,
      subtotal,
      tax,
      deliveryfee,
      totalAmount,
      paymentMethod,
      address,
      deliveryInstructions,
      latitude: lat,
      longitude: lng,
    };
      return await this._orderRepository.createOrderRepo(orderData);
    } catch (error) {
      console.log("OrderService Error:", error);
      throw error;
    }
  };

  fetchOrders_with_Id = async (id: string) => {
    try {
      const orders = await this._orderRepository.findOrdersFromRestaurent(id);
      console.log("orders:", orders);
      return orders;
    } catch (error) {
      console.log(error);
    }
  };

  fetchOrders = async (id: string) => {
    try {
      const orders = await this._orderRepository.findOrdersOfUser(id);

      console.log(orders);
      return orders;
    } catch (error) {
      console.log(error);
    }
  };
}
