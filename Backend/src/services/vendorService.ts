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
import { Roles } from "../utils/roles";
import MenuCategory from "../models/menuCategoryModel";
import { passwordResetToken } from "../utils/password _reset";
import { IPasswordResetRepository } from "../interface/IPasswordResetRepository";
import { sendPasswordResetLink } from "../utils/sendResetLink";

@injectable()
class VendorService implements IVendorService {
  constructor(
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository,
    @inject("IPasswordResetRepository")
    private _passwordResetRepository: IPasswordResetRepository
  ) {}

  register = async (vendorData: any) => {
    try {
      console.log("Data got in backend for restaurent signup :", vendorData);
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

  verifyOtp = async (userProvidedotp: string, token: string, image: string) => {
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

      const location = {
        type: "Point",
        coordinates: [Number(vendor.longitude), Number(vendor.latitude)],
      };

      console.log("Location to save:", location);
      console.log("checking types:", typeof location.coordinates[0]);
      const restaurent = {
        ...vendor,
        displayPicture: image,
        location: location,
      };

      console.log("restaurent to save with image::::::::::", restaurent);

      const savedVendor = await this._vendorRepository.saveRestuarent(
        restaurent
      );
      console.log("Saved vendor:", savedVendor);
      await redisClient.del(`reg:${token}`);

      if (!savedVendor) {
        throw new Error("unable to verify otp ");
      }

      console.log("Saved hotel with image:", savedVendor);

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
        if (!verified.adminVerified) {
          return { message: "Your profile is under verification" };
        } else {
          const role = Roles.RESTAURENT;
          const accessToken = generateAccessToken(verified, role);
          const refreshToken = generateRefreshToken(verified, role);

          const data = {
            _id: verified._id,
            email: verified.email,
            mobile: verified.phone,
            role: role,
            adminVerified: verified.adminVerified,
            accessToken,
            refreshToken,
          };

          return data;
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
        return { errormessage: "unable to add" };
      } else {
        console.log("Saved menu:", saveItems);
        return saveItems;
      }
    } catch (error) {
      console.log(data);
    }
  };

  addCategory = async (data: any) => {
    try {
      console.log("CategoryDATa:", data);
      const categoryExist = await this._vendorRepository.categoryExistCheck(
        data
      );

      if (categoryExist) {
        throw new Error("Category already exists");
      }

      const savenewCategory = await this._vendorRepository.createnewCategory(
        data
      );

      if (!savenewCategory) {
        throw new Error("unable to create category, something went wrong");
      }

      return savenewCategory;
    } catch (error) {
      console.log(error);
    }
  };

  fetchCategories = async (id: string) => {
    try {
      const categories = await this._vendorRepository.findCategory(id);

      if (!categories) {
        throw new Error("Something went wrong! no categories found");
      }

      return categories;
    } catch (error) {
      console.log(error);
    }
  };

  fetchMenu = async (id: string) => {
    try {
      const menu = await this._vendorRepository.findMenu(id);
      if (!menu) {
        throw new Error("Something went wrong!");
      }

      const data = {
        _id: menu._id,
        hotelId: menu.hotelId,
        itemName: menu.itemName,
        category: menu.category,
        description: menu.description,
        price: menu.price,
      };

      return menu;
    } catch (error) {
      console.log(error);
    }
  };

  handleCategoryDeletion = async (id: string) => {
    try {
      console.log("Inside deletion service");
      const categoryDeletion = await this._vendorRepository.handleDelete(id);

      if (!categoryDeletion) {
        throw new Error("Something went wrong! , unable to delete Category");
      }

      return categoryDeletion;
    } catch (error) {
      console.log(error);
    }
  };

  orderManagement = async (id: string) => {
    try {
      const orderList = await this._vendorRepository.fetchAllOrders(id);

      console.log("The orders of restauretn with id:", id, ":", orderList);

      return orderList;
    } catch (error) {
      console.log(error);
    }
  };

  getOrder = async (id: string) => {
    try {
      const order = await this._vendorRepository.findOrder(id);
      return order;
    } catch (error) {
      console.log(error);
    }
  };

  resetPassword = async (email: string) => {
    try {
      const hotel = await this._vendorRepository.findHotelWithEmail(email);

      if (!hotel) {
        throw new Error(`No hotel Found with email ${email}`);
      }

      const token = passwordResetToken()
      console.log("Token for password changing:",token);

      const data = {
        user: hotel._id,
        userModel: "Vendor",
        token: token,
      };

      const saveHotel = await this._passwordResetRepository.saveTokenforRestaurent(data);

      if (!saveHotel) {
        throw new Error("Error in password reset");
      }

      const role = Roles.RESTAURENT;

      const sendLink = await sendPasswordResetLink(hotel.email, token, role);

      return {
        message: `A link send to your email ${hotel.email} to reset your passoword`,
        token: token,
      };
    } catch (error) {
      console.log(error);
    }
  };

  verifyAndResetPassword = async (token: string, password: string) => {
    try {
      const checkUser = await this._passwordResetRepository.checkHotel(token);
      console.log("CHECK USER::>>>>>>>>",checkUser)

      if (!checkUser) {
        throw new Error("Invalid token ");
      }

      const hashed = await hashPassword(password);
      console.log("hased password", hashed);
      const passWordUpdated = await this._vendorRepository.updatePassword(
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
}

export default VendorService;
