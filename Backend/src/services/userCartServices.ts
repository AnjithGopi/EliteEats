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

  // cartImplementation = async (
  //   userId: string,
  //   productId: string,
  //   hotelId: string,
  //   quantity: number,
  //   price: number,
  //   variant:string,
  //   addons:[]
  // ) => {
  //   if (quantity <= 0 || price <= 0) {
  //     throw new Error("Invalid quantity or price");
  //   }

  //   const [user, product] = await Promise.all([
  //     this._userRepository.getUser(userId),
  //     this._vendorRepository.findItem(productId),
  //   ]);

  //   if (!user) throw new Error("User not found");
  //   if (!product) throw new Error("Product not found");

  //   const cart = await this._cartRepository.findCart(userId);
  //   if (cart && cart.hotelId.toString() !== hotelId) {
  //     console.log("Cart found::::::::>>>>>>>", cart);
  //     throw new Error("Cart is already ready with another restaurent Data");
  //   }

  //   const newItem = {
  //     productId,
  //     quantity,
  //     productName: product.itemName,
  //     productImage: product.images,
  //     productPrice: price,
  //   };

  //   if (!cart) {
  //     return this._cartRepository.createNewCart({
  //       userId,
  //       hotelId,
  //       items: [newItem],
  //       totalPrice: price * quantity,
  //     });
  //   }

  //   const itemIndex = cart.items.findIndex(
  //     (item: any) => item.productId.toString() === productId.toString()
  //   );

  //   if (itemIndex > -1) {
  //     cart.items[itemIndex].quantity += quantity;
  //   } else {
  //     cart.items.push(newItem);
  //   }

  //   cart.totalPrice = cart.items.reduce(
  //     (total: any, item: any) => total + item.quantity * item.productPrice,
  //     0
  //   );

  //   return this._cartRepository.updateCart(userId, cart);
  // };

  cartImplementation = async (
    userId: string,
    productId: string,
    hotelId: string,
    quantity: number,
    price: number,
    variant: string | null,
    addons: string[]
  ) => {
    if (quantity <= 0 || price <= 0) {
      throw new Error("Invalid quantity or price");
    }

    if(!this._userRepository?.getUser){
      throw new Error("Something went wrong in get User")
    }

    const [user, product] = await Promise.all([
      this._userRepository.getUser(userId),
      this._vendorRepository.findItem(productId),
    ]);

    if (!user) throw new Error("User not found");
    if (!product) throw new Error("Product not found");

    const cart = await this._cartRepository.findCart(userId);
    if (cart && cart.hotelId.toString() !== hotelId) {
      console.log("Cart found::::::::>>>>>>>", cart);
      throw new Error("Cart is already saved with another restaurent Data");
    }

    // Calculate item prices with variants and addons
    //let basePrice = parseFloat(product.price);
    let basePrice=Number(price)
    console.log("Base price calculated:", basePrice);
    let selectedVariant = null;
    let selectedAddons: { name: string; price: number }[] = [];
    let itemTotalPrice = basePrice;

    // Handle variant
    if (variant && product.variants && product.variants.length > 0) {
      const variantObj = product.variants.find((v: any) => v.name === variant);
      if (variantObj) {
        selectedVariant = {
          name: variantObj.name,
          price: parseFloat(variantObj.price),
        };
        itemTotalPrice += selectedVariant.price;
      }
    }

    // Handle addons
    if (
      addons &&
      addons.length > 0 &&
      product.addons &&
      product.addons.length > 0
    ) {
      addons.forEach((addonName) => {
        const addonObj = product.addons.find((a: any) => a.name === addonName);
        if (addonObj) {
          selectedAddons.push({
            name: addonObj.name,
            price: parseFloat(addonObj.price),
          });
          itemTotalPrice += parseFloat(addonObj.price);
        }
      });
    }

    const newItem = {
      productId,
      quantity,
      productName: product.itemName,
      productImage: product.images,
      productPrice: basePrice,
      selectedVariant,
      selectedAddons,
      itemTotalPrice,
      originalItemPrice: basePrice,
    };

    if (!cart) {
      return this._cartRepository.createNewCart({
        userId,
        hotelId,
        items: [newItem],
        totalPrice: itemTotalPrice * quantity,
      });
    }

    // Check if item with same variant and addons already exists
    const itemIndex = cart.items.findIndex((item: any) => {
      const sameProduct = item.productId.toString() === productId.toString();

      // Compare variants
      const sameVariant =
        JSON.stringify(item.selectedVariant) ===
        JSON.stringify(selectedVariant);

      // Compare addons
      const sameAddons =
        JSON.stringify(item.selectedAddons) === JSON.stringify(selectedAddons);

      return sameProduct && sameVariant && sameAddons;
    });

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push(newItem);
    }

    cart.totalPrice = cart.items.reduce(
      (total: number, item: any) => total + item.quantity * item.itemTotalPrice,
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

  deleteIteminCart = async (userId: string, itemId: string) => {
    try {
      console.log("Deletion in service cart");
      const deleteItem = await this._cartRepository.deleteItems(userId, itemId);

      return deleteItem;
    } catch (error) {
      console.log(error);
    }
  };
}
