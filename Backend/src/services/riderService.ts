import { inject, injectable } from "inversify";
import { LoginData } from "../domain/interface/Admin/IAdminService";
import OtpRepository from "../repositories/otpRepository";
import { IRider, IRiderRepository } from "../domain/interface/Rider/IRiderRepository";
import comparePassword from "../utils/comparePasswords";
import generateOtp from "../utils/generateOtp";
import hashPassword from "../utils/hashPassword";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import sendOtp from "../utils/sendIOtp";
import { IRiderService } from "../domain/interface/Rider/IRiderService";

@injectable()
export class RiderService implements IRiderService {
  private otpRepository: OtpRepository;

  constructor(
    @inject("IRiderRepository") private _riderRepository: IRiderRepository
  ) {
    this.otpRepository = new OtpRepository();
  }

  register = async (riderData:any) => {
    try {
      console.log("riderData:", riderData);

      const existingRider = await this._riderRepository.checkExists(riderData);

      if (existingRider) {
        throw new Error("User already exists");
      }

      const hashedPassword = await hashPassword(riderData.password);

      const riderToSave = {
        ...riderData,
        password: hashedPassword,
      };

      const savedRider = await this._riderRepository.saveRider(riderToSave);

      const otp = generateOtp();

      const saveOtp = savedRider
        ? await this.otpRepository.createOtp(savedRider.email, otp.toString())
        : undefined;
      saveOtp && savedRider ? await sendOtp(saveOtp.email, otp) : undefined;

      return { message: "OTP send successfully" };
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp = async (otp: string) => {
    try {
      const user = await this.otpRepository.findbyOtp(otp);

      if (!user) {
        throw new Error("Incorrect otp");
      }

      const data = await this._riderRepository.verifyRider(user);

      if (data) {
        return data;
      } else {
        throw new Error("Failed to verify otp");
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyLogin = async (loginData:{email:string,password:string}) => {
    try {
      const riderFound = await this._riderRepository.verifyLogin(loginData);

      if (!riderFound) {
        throw new Error("Incorrect email");
      }

      const passwordMatch = await comparePassword(
        loginData.password,
        riderFound.password
      );

      if (!passwordMatch) {
        throw new Error("Incorrect Password");
      }

      if (riderFound && passwordMatch) {
        console.log("Rider found:", riderFound);
        const accessToken = generateAccessToken(riderFound);
        const refreshToken = generateRefreshToken(riderFound);

        return { ...riderFound.toObject(), accessToken, refreshToken };
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  };
}
