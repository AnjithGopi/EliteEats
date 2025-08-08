export interface IUserCartService {
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
