import { IRider } from "./IRiderRepository";

export interface IRiderService {
  register(riderData: IRider): Promise<string | IRider | undefined | any>;
  verifyOtp(otp: string): Promise<IRider>;
  verifyLogin(loginData: { email: string; password: string }): Promise<IRider>;
}
