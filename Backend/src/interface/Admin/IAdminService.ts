// interfaces/IAdminService.ts

export interface LoginData {
    email: string;
    password: string;
  }
  
  
  export interface UserDetails {
    _id: string;
    name: string;
    email: string;
    mobile: number;
    isActive: boolean;
    otpVerified: boolean;
    isAdmin: boolean;
    createdAt: NativeDate;
  }
  
  export interface IAdminService {

    findAdmin(loginData: LoginData): Promise<{accessToken:string,refreshToken:string}|false|undefined|any>
    findUsers(): Promise<UserDetails[] | undefined>;
    findUser(id: string): Promise<UserDetails|null |undefined>;
    blockUser(id: string): Promise<UserDetails | null | undefined>;
    unBlockUser(id: string): Promise<UserDetails | null | undefined>;
    getRestaurents():Promise<any>,
    findRestaurent(id:string):Promise<any>

  }