export interface IOrderRepository {
  createOrderRepo(orderData: any): Promise<any>;
  findOrdersFromRestaurent(id: string): Promise<any>;
  findOrdersOfUser(id:string):Promise<any>
}
