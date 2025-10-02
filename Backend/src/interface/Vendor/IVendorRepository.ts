export interface IVendorRepository {
  checkExists(userData: any): Promise<any>;
  saveRestuarent(data: any): Promise<any>;
  findRestaurent(loginData: any): Promise<any>;
  restaurents(): Promise<any>;
  checkItemExist(data: any): Promise<any>;
  saveMenu(data: any): Promise<any>;
  findhotel(id: string): Promise<any>;
  categoryExistCheck(data: any): Promise<any>;
  createnewCategory(data: any): Promise<any>;
  findItem(data: any): Promise<any>;
  findCategory(data: string): Promise<any>;
  findMenu(data:string):Promise<any>
  handleDelete(data:string):Promise<any>;
  fetchAllOrders(id:string):Promise<any>;
  findOrder(id:string):Promise<any>;
  findHotelWithEmail(email:string):Promise<any>
  updatePassword(email:string,hashed:string|undefined):Promise<any>

  
}
