import { injectable, inject } from "inversify";
import { IUserCartService } from "../interface/User/IUserCartService";
import { ICartRepository } from "../interface/User/ICartRepository";
import { IUserRepository } from "../interface/User/IUserRepository";
import { IVendorRepository } from "../interface/Vendor/IVendorRepository";

@injectable()
export class UserCartService implements IUserCartService {
  constructor(
    @inject("ICartRepository") private _cartRepository: ICartRepository,
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository
  ) {}

  cartImplementation = async (
    userId: string,
    productId: string,
    hotelId: string,
    quantity: number,
    price: number
  ) => {
    if (quantity <= 0 || price <= 0) {
      throw new Error("Invalid quantity or price");
    }

    const [user, product] = await Promise.all([
      this._userRepository.getUser(userId),
      this._vendorRepository.findItem(productId),
    ]);

    if (!user) throw new Error("User not found");
    if (!product) throw new Error("Product not found");

    const cart = await this._cartRepository.findCart(userId);
    if (cart.hotelId !== hotelId) {
      throw new Error("Cart is already ready with another restaurent Data");
    }

    const newItem = {
      productId,
      quantity,
      productName: product.itemName,
      productImage: product.images,
      productPrice: price,
    };

    if (!cart) {
      return this._cartRepository.createNewCart({
        userId,
        hotelId,
        items: [newItem],
        totalPrice: price * quantity,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push(newItem);
    }

    cart.totalPrice = cart.items.reduce(
      (total: any, item: any) => total + item.quantity * item.productPrice,
      0
    );

    return this._cartRepository.updateCart(userId, cart);
  };

  findCart = async (id: string) => {
    try {
      const cart = this._cartRepository.getCart(id);

      if (!cart) {
        throw new Error("No cart found");
      }
      return cart;
    } catch (error) {
      console.log(error);
    }
  };

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
