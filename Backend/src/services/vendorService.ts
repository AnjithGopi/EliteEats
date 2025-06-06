import { injectable, inject } from "inversify";
import redisClient from "../config/redis";
import { IVendorService } from "../interface/Vendor/IVendorService";
import {VendorRepository} from "../repositories/vendorRepository";
import comparePassword from "../utils/comparePasswords";
import generateOtp from "../utils/generateOtp";
import hashPassword from "../utils/hashPassword";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import redisVerificationToken from "../utils/redisverificaton";
import sendOtp from "../utils/sendIOtp";
import { IVendorRepository } from "../interface/Vendor/IVendorRepository";

@injectable()
 class VendorService implements IVendorService {
  constructor(@inject("IVendorRepository") private _vendorRepository: IVendorRepository) {}

  register = async (vendorData: any) => {
    try {
      const existingUser = await this._vendorRepository.checkExists(vendorData);

      if (existingUser) {
        throw new Error(" Restaurent already exists");
      }

      const password = await hashPassword(vendorData.password);

      const vendorToSave = { ...vendorData, password: password }; // creating new restaurent object with hashed password

      const otp = generateOtp();

      console.log("otp send:",otp)

      const verificationToken = redisVerificationToken();

      if (vendorToSave && otp && verificationToken) {
        await redisClient.setEx(
          `reg:${verificationToken}`,
          300,
          JSON.stringify({ vendor: vendorToSave, otp: otp.toString() })
        );

        await sendOtp(vendorToSave.email, otp.toString());

        return { message: "OTP send Successfully", verificationToken };
      } else {
        throw new Error("Unable to complete registration, sending otp failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp = async (userProvidedotp: string, token: string) => {
    try {
      console.log("token from user:",token)
      const storedData = await redisClient.get(`reg:${token}`);
      console.log("StoredData:",storedData)
      if (!storedData) {
        throw new Error("Invalid or expired token");
      }

      const { otp, vendor } = JSON.parse(storedData);

      if (otp !== userProvidedotp) {
        throw new Error("Incorrect otp");
      }
      console.log("userto save:",vendor)

      const savedVendor = await this._vendorRepository.saveRestuarent(vendor);
      await redisClient.del(`reg:${token}`);

      if (!savedVendor) {
        throw new Error("unable to verify otp ");
      }

      return savedVendor;
    } catch (error) {
      console.log(error);
    }
  };

  login = async (loginData: { email: string; password: string }) => {
    try {
      const verified = await this._vendorRepository.findRestaurent(loginData);

      if (!verified) {
        throw new Error("Incorrect email");
      }

      const passwordMatch = await comparePassword(
        loginData.password,
        verified.password
      );

      if (!passwordMatch) {
        throw new Error("Incorrect Password");
      }

      if (verified && passwordMatch) {
        const accessToken = generateAccessToken(verified);
        const refreshToken = generateRefreshToken(verified);

        return { ...verified.toObject(), accessToken, refreshToken };
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  };
}


export default VendorService

