
export interface IUserObject{

   
        name?: string;
        email?: string;
        mobile?: number;
        password?: string;
        isActive?: boolean;
        otpVerified?: boolean;
        isAdmin?: boolean;
        createdAt?: Date;
        _id?:string;
        __v?: number;
      
      
    
}

export interface IPasswordResetRepository {
  saveToken(user:IUserObject|string|any): Promise<IUserObject|false|undefined|any>;
  checkuser(token:string):Promise<any>;
}
