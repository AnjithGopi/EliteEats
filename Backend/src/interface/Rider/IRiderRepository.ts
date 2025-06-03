export interface IRider {
  _id?: string;
  name?: string;
  email?: string;
  mobile?: number;
  password?: string;
  otpVerified?: boolean;
  isActive?: boolean;
  isOnline?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  accessToken?:string;
  refreshToken?:string;
}

export interface IRiderRepository {
  checkExists(riderData: {
    email: string;
    moblile: number;
  }): Promise<IRider | any>;
  saveRider(riderData: any): Promise<IRider | any>;
  verifyRider(user: { email: string }): Promise<IRider | any>;
  verifyLogin(loginData: { email: string }): Promise<IRider | any>;
}
