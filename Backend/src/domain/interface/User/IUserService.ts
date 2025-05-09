interface UserObject {
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
  

  
 interface AuthResponse {
    user?: UserObject;
    accessToken?: string;
    refreshToken?: string;
  }
  



export interface IUserService {
  register(userData: any): Promise<UserObject|any>;
  verifyOtpAndRegister (otpData:string,token:string): Promise<UserObject>;
  verifyLogin(loginData: any): Promise<AuthResponse|false|undefined>;
  forgotPassword(email:string):Promise<AuthResponse|UserObject|undefined|string|object>;
  verifyAndResetPassword(token:string,password:string,confirmPassword:string):Promise<any>

}
