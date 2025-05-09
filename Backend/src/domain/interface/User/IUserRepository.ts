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
  }