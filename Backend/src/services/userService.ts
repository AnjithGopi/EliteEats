import generateOtp from "../utils/generateOtp";
import sendOtp from "../utils/sendIOtp";
import hashPassword from "../utils/hashPassword";
import comparePassword from "../utils/comparePasswords";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { IUserService } from "../interface/User/IUserService";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../interface/User/IUserRepository";
import { LoginData } from "../interface/Admin/IAdminService";
import redisVerificationToken from "../utils/redisverificaton";
import redisClient from "../config/redis";
import { passwordResetToken } from "../utils/password _reset";
import { IPasswordResetRepository } from "../interface/IPasswordResetRepository";
import { sendPasswordResetLink } from "../utils/sendResetLink";
import {generate_userId}from "../utils/generate_userid"

@injectable()
class UserService implements IUserService {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IPasswordResetRepository")
    private _passwordResetRepository: IPasswordResetRepository
  ) {}

  register = async (userData: any) => {
    console.log(userData);
    try {
      const existingUser = await this._userRepository.checkExists(userData);

      if (existingUser) {
        throw new Error("User already exists");
      }

      const password = await hashPassword(userData.password);
      const userId=generate_userId()

      const userToSave = { ...userData, password: password,userId }; // creating new user object with hashed password
      console.log(userToSave);

      const otp = generateOtp();

      const verificationToken = redisVerificationToken();

      if (userToSave && otp && verificationToken) {
        await redisClient.setEx(
          `reg:${verificationToken}`,
          300,
          JSON.stringify({ user: userToSave, otp: otp.toString() })
        );
        console.log("email", userToSave.email);
        console.log("otp:", otp.toString());

        await sendOtp(userToSave.email, otp.toString());

        return { message: "OTP send successfully", verificationToken };
      } else {
        throw new Error("Unable to send otp");
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtpAndRegister = async (userProvidedOtp: string, token: string) => {
    try {
      const storedData = await redisClient.get(`reg:${token}`);

      if (!storedData) {
        throw new Error("Invalid or expired verification token");
      }

      console.log("stored in redis:", storedData);

      const { user, otp } = JSON.parse(storedData);

      if (otp !== userProvidedOtp) {
        throw new Error("Incorrect otp");
      }

      const saveUser = await this._userRepository.saveUser(user);
      await redisClient.del(`reg:${token}`);

      return saveUser;
    } catch (error) {
      console.log(error);
    }
  };

  verifyLogin = async (loginData: LoginData) => {
    try {
      const user = await this._userRepository.loginVerification(loginData);

      if (user.isActive === false) {
        throw new Error("Unable to login , userBlocked by admin");
      }

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

        return { accessToken, refreshToken };
      }

      throw new Error("Unable to verify login check email and password again");
    } catch (error) {
      console.log(error);
    }
  };

  forgotPassword = async (email: string) => {
    try {
      const user = await this._userRepository.findwithEmail(email);
      if (!user) {
        throw new Error("Incorrect email");
      }
      const token = passwordResetToken();
      const data = {
        user: user._id,
        userModel: "User",
        token: token,
      };
      const saveUser = await this._passwordResetRepository.saveToken(data);
      if (!saveUser) {
        throw new Error("Error in password reset");
      }
      const role = "user";
      const sendLink = await sendPasswordResetLink(user.email, token, role);

      return {
        message: `A link send to your email ${user.email} to reset your passoword`,
        token: token,
      };
    } catch (error) {
      console.log(error);
    }
  };

  verifyAndResetPassword = async (token: string, password: string) => {
    try {
      const checkUser = await this._passwordResetRepository.checkuser(token);

      if (!checkUser) {
        throw new Error("Invalid token ");
      }

      const hashed = await hashPassword(password);
      const passWordUpdated = await this._userRepository.updatePassword(
        checkUser.user.email,
        hashed
      );

      if (!passWordUpdated) {
        throw new Error("Unable to reset Password");
      }

      const deleteToken = await this._passwordResetRepository.deleteToken(
        token
      );

      if (deleteToken) {
        return passWordUpdated;
      } else {
        throw new Error("Something went wrong ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  getHotels=async()=>{

    try {

      const hotels=  await this._userRepository.getHotels()

      if(!hotels){
        throw new Error("no hotels found")
      }

      const data= hotels.map((hotel:any)=>{

        return {

          name:hotel.name,
          _id:hotel._id
        }
      })

      return data
      
    } catch (error) {
      console.log(error)
      
    }


  }
}

export default UserService;
