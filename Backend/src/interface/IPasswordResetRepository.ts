import { IUserObject } from "../types/iuserObject";
export interface IPasswordResetRepository {
  saveToken(
    user: IUserObject | string | any
  ): Promise<IUserObject | false | undefined | any>;
  checkuser(token: string): Promise<any>;
  deleteToken(token: string): Promise<any>;
  saveTokenforRestaurent(data:any):Promise<any>
  checkHotel(token:string):Promise<any>

}
