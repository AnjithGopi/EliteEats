import UserRepository from "../repositories/userRepository.ts";
import generateOtp from "../utils/generateOtp.ts";
import sendOtp from "../utils/sendIOtp.ts";
import OtpRepository from "../repositories/otpRepository.ts";
import hashPassword from "../utils/hashPassword.ts";
import comparePassword from "../utils/comparePasswords.ts";
import { generateAccessToken } from "../utils/jwt.ts";

class UserService {
  private userRepository: UserRepository;
  private otpRepository: OtpRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.otpRepository = new OtpRepository();
  }

  register = async (userData) => {
    try {
      const existingUser = await this.userRepository.checkExists(userData);

      if (existingUser) {
        throw new Error("User already exists");
      }

      const password = await hashPassword(userData.password);

      const userToSave = { ...userData, password: password }; // creating new user object with hashed password

      let savedUser = await this.userRepository.saveUser(userToSave);
      const otp = generateOtp();

      const saveOtp = savedUser
        ? await this.otpRepository.createOtp(savedUser.email, otp)
        : undefined;
      saveOtp ? await sendOtp(saveOtp.email, saveOtp.otp) : undefined;

      return { message: "OTP send successfully" };
    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (otpData) => {
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

  verifyUser = async (data) => {
    try {
      console.log("data in verifyUser:", data);
      const isVerified = await this.userRepository.verify(data);
      if (!isVerified) {
        throw new Error("Invalid otp");
      }

      return isVerified;
    } catch (error) {
      console.log(error);
    }
  };

  verifyLogin = async (loginData) => {
    try {
      const user = await this.userRepository.loginVerification(loginData);

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
        console.log(accessToken);

        return { ...user.toObject(), accessToken }; // toObject is used to opt out the metadata from mongodb
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserService;
