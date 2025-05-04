import generateOtp from "../utils/generateOtp";
import sendOtp from "../utils/sendIOtp";
import OtpRepository from "../repositories/otpRepository";
import hashPassword from "../utils/hashPassword";
import comparePassword from "../utils/comparePasswords";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { IUserService } from "../domain/interface/User/IUserService";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../domain/interface/User/IUserRepository";
import { LoginData } from "../domain/interface/Admin/IAdminService";

@injectable()
class UserService implements IUserService {
  private otpRepository: OtpRepository;

  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {
    this.otpRepository = new OtpRepository();
  }

  register = async (userData: any) => {
    try {
      const existingUser = await this._userRepository.checkExists(userData);

      if (existingUser) {
        throw new Error("User already exists");
      }

      const password = await hashPassword(userData.password);

      const userToSave = { ...userData, password: password }; // creating new user object with hashed password

      let savedUser = await this._userRepository.saveUser(userToSave);
      const otp = generateOtp();

      const saveOtp = savedUser
        ? await this.otpRepository.createOtp(savedUser.email, otp.toString())
        : undefined;
      saveOtp ? await sendOtp(saveOtp.email, saveOtp.otp) : undefined;

      return { message: "OTP send successfully" };
    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (otpData: any) => {
    try {
      let data = await this.otpRepository.findbyOtp(otpData);

      if (!data) {
        throw new Error("incorrect otp");
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  verifyUser = async (data: any) => {
    try {
      console.log("data in verifyUser:", data);
      const isVerified = await this._userRepository.verify(data);
      if (!isVerified) {
        throw new Error("Invalid otp");
      }

      return isVerified;
    } catch (error) {
      console.log(error);
    }
  };

  verifyLogin = async (loginData:LoginData):Promise<{accessToken: string, refreshToken: string}|false |any> => {
    try {
      const user = await this._userRepository.loginVerification(loginData);

      if (!user) {
        throw new Error("Incorrect email");
      }

      const passwordMatch = await comparePassword(
        loginData.password,
        user.password
      );

      if (!passwordMatch) {
        throw new Error("Incorrect Password");
      }

      if (user && passwordMatch) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        console.log(accessToken);
        console.log(refreshToken);

        return { accessToken, refreshToken }; // toObject is used to opt out the metadata from mongodb
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserService;
