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

      console.log("password:", password);

      const userToSave = { ...userData, password: password }; // creating new user object with hashed password

      console.log("userToSave:.....", userToSave);

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
    let data = await this.otpRepository.findbyOtp(otpData);

    if (!data) {
      throw new Error("incorrect otp");
    }

    return data;
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
      const emailVerified = await this.userRepository.verifyLogin(loginData);

      if (!emailVerified) {
        throw new Error(" Incorrect Email");
      }

      const password = await comparePassword(
        loginData.password,
        emailVerified.password
      );

      if (!password) {
        throw new Error("Incorrect Password");
      }

      const passwordVerified = await this.userRepository.verifyLogin(loginData);

      if (!passwordVerified) {
        throw new Error("Incorrect password");
      }

      if (emailVerified && passwordVerified) {
        const accessToken = generateAccessToken(passwordVerified);
        const userData = { ...passwordVerified.toObject(),accessToken }; // toObject is used to opt out the metadata from mongodb

        return userData;
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserService;
