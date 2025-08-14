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
