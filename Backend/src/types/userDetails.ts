
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
