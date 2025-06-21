export interface IUserRepository {
    checkExists(userData: any): Promise<any>;
    saveUser(userData: any): Promise<any>;
    loginVerification(loginData: any): Promise<any>;
    findAdmin(loginData: any): Promise<any>;
    findUsers(): Promise<any[] | undefined>;
    getDetails(id: string): Promise<any>;
    block(id: string): Promise<any>;
    unblock(id: string): Promise<any>;
    findwithEmail(email:string):Promise<any>;
    updatePassword(email:any,password:string|any):Promise<any>;
    getHotels():Promise<any>
    getUser(userData:any):Promise<any>;
    findCart(id:any):Promise<any>;
    createNewCart(data:any):Promise<any>
    
   
  }