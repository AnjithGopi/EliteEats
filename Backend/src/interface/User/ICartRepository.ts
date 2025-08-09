export interface ICartRepository {
  findCart(id: any): Promise<any>;
  createNewCart(data: any): Promise<any>;
  updateCart(userId: any, cart: any): Promise<any>;
  getCart(id: string): Promise<any>;
  findCartAndUpdate(
    userId: string,
    itemId: string,
    quantity: number
  ): Promise<any>;

  deleteItems(userId: string, itemId: string): Promise<any>;
}
