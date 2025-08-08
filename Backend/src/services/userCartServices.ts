import { injectable, inject } from "inversify";
import { IUserCartService } from "../interface/User/IUserCartService";
import { ICartRepository } from "../interface/User/ICartRepository";


@injectable()
export class UserCartService implements IUserCartService {
  constructor(
    @inject("ICartRepository") private _cartRepository: ICartRepository
  ) {}

  updateQuantityinCart = async (
    userId: string,
    itemId: string,
    quantity: number
  ) => {
    try {
      console.log("Cart service worked", itemId, userId, quantity);
      const updatedCart = this._cartRepository.findCartAndUpdate(
        userId,
        itemId,
        quantity
      );

      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };

  decrementCartItems = async (
    userId: string,
    itemId: string,
    quantity: number
  ) => {
    try {
      const updatedCart = this._cartRepository.findCartAndUpdate(
        userId,
        itemId,
        quantity
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };
}
