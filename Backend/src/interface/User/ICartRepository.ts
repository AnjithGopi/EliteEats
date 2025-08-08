export interface ICartRepository {
  findCartAndUpdate(
    userId: string,
    itemId: string,
    quantity: number
  ): Promise<any>;
}
