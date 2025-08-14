import { LoginData } from "../../types/loginData";
import { UserLocation } from "../../types/userLocation";


export interface IUserRepository {
  checkExists(userData: any): Promise<any>;
  saveUser(userData: any): Promise<any>;
  loginVerification(loginData: LoginData): Promise<any>;
  findAdmin(loginData: any): Promise<any>;
  findUsers(): Promise<any[] | undefined>;
  getDetails(id: string): Promise<any>;
  block(id: string): Promise<any>;
  unblock(id: string): Promise<any>;
  findwithEmail(email: string): Promise<any>;
  updatePassword(email: any, password: string | any): Promise<any>;
  getHotels(): Promise<any>;
  getUser(userData: any): Promise<any>;
  fetchData(id: string): Promise<any>;
  placeOrder(data: any): Promise<any>;
  findItem(id: string): Promise<any>;
  findOrders(): Promise<any>;
  findallOrders(id: string): Promise<any>;
  updateUser(data: string): Promise<any>;
  saveUserLocation(data:UserLocation): Promise<any>;
  findWithLocation(longitude:number,latitude:number):Promise<any>
  fetchLocation(id:string):Promise<any>
  clear(id:string):Promise<any>
  createAddress(data:any):Promise<any>
  findAddress(id:string):Promise<any>
  finduserById(userId:string):Promise<any>
  updateUserPassword(id:string,password:any):Promise<any>
}
