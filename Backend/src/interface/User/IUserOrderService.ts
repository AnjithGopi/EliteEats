export interface IUserOrderService {
  createOrder(data: any): Promise<any>;
  fetchOrders_with_Id(id:string):Promise<any>
  fetchOrders(id:string):Promise<any>
}
