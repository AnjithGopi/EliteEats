import { ICartRepository } from "../interface/User/ICartRepository";
import Cart from "../models/cartModel";


export class CartRepository implements ICartRepository {
  constructor() {}

  findCart = async (id: any) => {
    try {
      console.log(`find if cart exist for the given user with id : ${id}`);

      return await Cart.findOne({ userId: id });
    } catch (error) {
      console.log(error);
    }
  };

  createNewCart = async (data: any) => {
    try {
      return await Cart.create(data);
    } catch (error) {
      console.log(error);
    }
  };

  updateCart = async (userId: any, cart: any) => {
    try {
      return await Cart.findOneAndUpdate(
        { userId },
        {
          $set: {
            items: cart.items,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  getCart = async (id: string) => {
    try {
      const cart= await Cart.findOne({ userId: id });
      console.log("Cart found with matching userId:>>>",cart)
      return cart
    } catch (error) {
      console.log(error);
    }
  };

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

  deleteItems = async (userId: string, itemId: string) => {
    try {
      const updatedCart = await Cart.updateOne(
        { userId: userId },
        {
          $pull: { items: { _id: itemId } },
        }
      );

      console.log(updatedCart);

      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };
}



// import { BaseRepository } from "./BaseRepository/BaseRepository";
// import Cart from "../models/cartModel";
// import { ICartRepository } from "../interface/User/ICartRepository";

// export class CartRepository extends BaseRepository implements ICartRepository {
//   constructor() {
//     super(Cart);
//   }

//   findCart = async (userId: string) => {
//     return this.findOne({ userId });
//   };

//   createNewCart = async (data: any) => {
//     return this.create(data);
//   };

//   updateCart = async (userId: string, cart: any) => {
//     return this.updateOne({ userId }, { $set: { items: cart.items } });
//   };

//   getCart = async (userId: string) => {
//     return this.findOne({ userId });
//   };

//   findCartAndUpdate = async (userId: string, itemId: string, newQuantity: number) => {
//     const cart = await this.findOne({ userId });
//     if (!cart) throw new Error("Cart not found");

//     const itemIndex = cart.items.findIndex(
//       (item) => item._id.toString() === itemId
//     );

//     if (itemIndex === -1) throw new Error("Item not found in cart");

//     cart.items[itemIndex].quantity = newQuantity;
//     return await cart.save();
//   };

//   deleteItems = async (userId: string, itemId: string) => {
//     return this.updateOne(
//       { userId },
//       { $pull: { items: { _id: itemId } } }
//     );
//   };
// }