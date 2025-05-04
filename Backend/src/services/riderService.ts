import { LoginData } from "../domain/interface/Admin/IAdminService";
import OtpRepository from "../repositories/otpRepository";
import RiderRepository from "../repositories/riderRepository";
import comparePassword from "../utils/comparePasswords";
import generateOtp from "../utils/generateOtp";
import hashPassword from "../utils/hashPassword";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import sendOtp from "../utils/sendIOtp";

class RiderService {
  private riderRepository: RiderRepository;
  private otpRepository: OtpRepository;

  constructor() {
    this.riderRepository = new RiderRepository();
    this.otpRepository = new OtpRepository();
  }

  register = async (riderData:any) => {
    try {
      console.log("riderData:", riderData);

      const existingRider = await this.riderRepository.checkExists(riderData);

      if (existingRider) {
        throw new Error("User already exists");
      }

      const hashedPassword = await hashPassword(riderData.password);

      const riderToSave = {
        ...riderData,
        password: hashedPassword,
      };

      const savedRider = await this.riderRepository.saveRider(riderToSave);

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

  verifyOtp = async (otp:string) => {
    try {
      const user = await this.otpRepository.findbyOtp(otp);

      if (!user) {
        throw new Error("Incorrect otp");
      }

      const data = await this.riderRepository.verifyRider(user);

      if (data) {
        return data;
      } else {
        throw new Error("Failed to verify otp");
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyLogin = async (loginData:LoginData) => {
    try {
      const riderFound = await this.riderRepository.verifyLogin(loginData);

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
        // const accessToken =  generateAccessToken(riderFound);
        // const refreshToken =  generateRefreshToken(riderFound);

        // return { ...riderFound.toObject(), accessToken, refreshToken };
        console.log("token for restaurent should be genereated while login")
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  };
}

export default RiderService;
