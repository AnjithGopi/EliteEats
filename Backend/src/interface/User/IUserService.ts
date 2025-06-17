export interface UserObject {
    name?: string;
    email?: string;
    mobile?: number;
    password?: string;
    isActive?: boolean;
    otpVerified?: boolean;
    isAdmin?: boolean;
    registered_On?: Date;
    _id?:string;
    __v?: number;
  }
  

  
 interface AuthResponse {
    user?: UserObject;
    accessToken?: string;
    refreshToken?: string;
  }
  



export interface IUserService {
  register(userData: UserObject): Promise<UserObject|any>;
  verifyOtpAndRegister (otpData:string,token:string): Promise<UserObject>;
  verifyLogin(loginData:{email:string,password:string}): Promise<AuthResponse|false|undefined>;
  forgotPassword(email:string):Promise<AuthResponse|UserObject|undefined|string|object>;
  verifyAndResetPassword(token:string,password:string):Promise<UserObject|any>
  getHotels():Promise<any>
  findUser(userData:any):Promise<any>

}
