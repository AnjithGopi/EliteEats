import { ICartRepository } from "../interface/User/ICartRepository";
import Cart from "../models/cartModel";
import mongoose from "mongoose";

export class CartRepository implements ICartRepository {
  constructor() {}

  findCartAndUpdate = async (
    userId: string,
    itemId: string,
    newQuantity: number
  ) => {
    try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
        throw new Error("Cart not found");
      }

      const itemIndex = cart.items.findIndex(
        (item) => item._id.toString() === itemId
      );

      if (itemIndex === -1) {
        throw new Error("Item not found in cart");
      }

      cart.items[itemIndex].quantity = newQuantity;

      const updatedCart = await cart.save();
      console.log("updated:", updatedCart);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };
}
