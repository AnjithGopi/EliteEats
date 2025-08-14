import { IRider } from "../../types/riderData";

export interface IRiderRepository {
  checkExists(riderData: {
    email: string;
    moblile: number;
  }): Promise<IRider | any>;
  saveRider(riderData: any): Promise<IRider | any>;
  verifyRider(user: { email: string }): Promise<IRider | any>;
  verifyLogin(loginData: { email: string }): Promise<IRider | any>;
  updateRider(data:any):Promise<any>
  riders():Promise<any>
  getDetails(id:string):Promise<any>
  verfiyRiderDetails(id:string):Promise<any>
  reject(id:string,reason:string):Promise<any>
}
