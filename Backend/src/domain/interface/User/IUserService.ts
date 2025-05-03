interface UserObject {
    name: string;
    email: string;
    mobile: number;
    password: string;
    isActive: boolean;
    otpVerified: boolean;
    isAdmin: boolean;
    createdAt: Date;
    _id?: any;
    __v?: number;
  }
  

  
 interface AuthResponse {
    user: UserObject;
    accessToken: string;
    refreshToken: string;
  }
  

interface OtpRecord {
  email: string;
  otp: string;
  expiry: Date;
}


export interface IUserService {
  register(userData: any): Promise<{ message: string } | undefined>;
  findUser(otpData: any): Promise<OtpRecord | undefined>;
  verifyUser(data: any): Promise<any>;
  verifyLogin(loginData: any): Promise<{accessToken:string,refreshToken:string}|false|undefined>
}
