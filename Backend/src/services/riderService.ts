import { inject, injectable } from "inversify";
import { IRiderRepository } from "../domain/interface/Rider/IRiderRepository";
import comparePassword from "../utils/comparePasswords";
import generateOtp from "../utils/generateOtp";
import hashPassword from "../utils/hashPassword";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import sendOtp from "../utils/sendIOtp";
import { IRiderService } from "../domain/interface/Rider/IRiderService";
import redisVerificationToken from "../utils/redisverificaton";
import redisClient from "../config/redis";

@injectable()
export class RiderService implements IRiderService {
  constructor(
    @inject("IRiderRepository") private _riderRepository: IRiderRepository) {}

  register = async (riderData: any) => {
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

      const otp = generateOtp();
      const verificationToken = redisVerificationToken();

      if (riderToSave && otp && verificationToken) {
        console.log("everything set for the rider to register ");
        await redisClient.setEx(
          `reg:${verificationToken}`,
          300,
          JSON.stringify({ rider: riderToSave, otp: otp.toString() })
        );

        console.log(
          JSON.stringify({ rider: riderToSave, otp: otp.toString() })
        );
        await sendOtp(riderToSave.email, otp.toString());
        return { message: "OTP send successfully", verificationToken };
      } else {
        throw new Error("Unable to send Otp");
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp = async (riderProvidedOtp: string, token: string) => {
    try {
      const storedData = await redisClient.get(`reg:${token}`);

      if (!storedData) {
        throw new Error("Invalid or Expired verification token");
      }

      console.log("StoredData:", storedData);

      const { rider, otp } = JSON.parse(storedData);

      if (otp !== riderProvidedOtp) {
        throw new Error("Incorrect Otp");
      }

      const saveRider = await this._riderRepository.saveRider(rider);

      await redisClient.del(`reg:${token}`);

      return saveRider;
    } catch (error) {
      console.log(error);
    }
  };

  verifyLogin = async (loginData: { email: string; password: string }) => {
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
