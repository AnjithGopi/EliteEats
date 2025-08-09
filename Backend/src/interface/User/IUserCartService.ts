export interface IUserCartService {
  cartImplementation(
    userId: any,
    productId: any,
    hotelId: string,
    quantity: any,
    price: number
  ): Promise<any>;
  findCart(id: string): Promise<any>;
  updateQuantityinCart(
    userId: string,
    itemId: string,
    quantity: number
  ): Promise<any>;
  decrementCartItems(
    userId: string,
    itemId: string,
    quantity: number
  ): Promise<any>;
}
