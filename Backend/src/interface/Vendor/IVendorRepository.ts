

export interface IVendorRepository {
    checkExists(userData: any): Promise<any>;
    saveRestuarent(data: any): Promise<any>;
    findRestaurent(loginData: any): Promise<any>;
    restaurents():Promise<any>,
    checkItemExist(data:any):Promise<any>
    saveMenu(data:any):Promise<any>
  }