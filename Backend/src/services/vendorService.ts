import { injectable, inject } from "inversify";
import redisClient from "../config/redis";
import { IVendorService } from "../interface/Vendor/IVendorService";
import { VendorRepository } from "../repositories/vendorRepository";
import comparePassword from "../utils/comparePasswords";
import generateOtp from "../utils/generateOtp";
import hashPassword from "../utils/hashPassword";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import redisVerificationToken from "../utils/redisverificaton";
import sendOtp from "../utils/sendIOtp";
import { IVendorRepository } from "../interface/Vendor/IVendorRepository";
import { createRestaurentid } from "../utils/restaurent_id";

@injectable()
class VendorService implements IVendorService {
  constructor(
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository
  ) {}

  register = async (vendorData: any) => {
    try {
      const existingUser = await this._vendorRepository.checkExists(vendorData);

      if (existingUser) {
        throw new Error(" Restaurent already exists");
      }

      const password = await hashPassword(vendorData.password);
      const restaurentId = createRestaurentid();

      const vendorToSave = {
        ...vendorData,
        password: password,
        restaurentId: restaurentId,
        phone: vendorData.phone || undefined,
      }; // creating new restaurent object with hashed password
      console.log("HOTEL TO SAVE::", vendorToSave);

      const otp = generateOtp();

      console.log("otp send:", otp);

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

  verifyOtp = async (userProvidedotp: string, token: string,image:string) => {
    try {
      console.log("token from user:", token);
      const storedData = await redisClient.get(`reg:${token}`);
      console.log("StoredData:", storedData);
      if (!storedData) {
        throw new Error("Invalid or expired token");
      }

      const { otp, vendor } = JSON.parse(storedData);

      if (otp !== userProvidedotp) {
        throw new Error("Incorrect otp");
      }
      console.log("userto save:", vendor);

      const restaurent={...vendor,displayPicture:image}

      console.log("restaurent to save with image::::::::::",restaurent)

      const savedVendor = await this._vendorRepository.saveRestuarent(restaurent);
      console.log("Saved vendor:", savedVendor);
      await redisClient.del(`reg:${token}`);

      if (!savedVendor) {
        throw new Error("unable to verify otp ");
      }

      console.log("Saved hotel with image:",savedVendor)

      return savedVendor

      
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
        if (!verified.adminVerified) {
          return { message: "Your profile is under verification" };
        } else {
          const accessToken = generateAccessToken(verified);
          const refreshToken = generateRefreshToken(verified);

          return { ...verified.toObject(), accessToken, refreshToken };
        }
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  };

  addMenu = async (data: any) => {
    try {
      console.log("menu data from controller:", data);

      const exist = await this._vendorRepository.checkItemExist(data);
      if (exist) {
        throw new Error("item already exists");
      }

      const saveItems = await this._vendorRepository.saveMenu(data);

      if (!saveItems) {
        return { errormessage:"unable to add" };
      } else {
        return saveItems;
      }
    } catch (error) {
      console.log(data);
    }
  };

  addCategory=async(data:any)=>{

    try {

      const categoryExist=await this._vendorRepository.categoryExistCheck(data)

      if(categoryExist){
        throw new Error("Category already exists")
      }


      const savenewCategory=await this._vendorRepository.createnewCategory(data)

      if(!savenewCategory){

        throw new Error("unable to create category, something went wrong")
      }

      return savenewCategory  


      
    } catch (error) {
      console.log(error)
      
    }
  }

  
}

export default VendorService;
