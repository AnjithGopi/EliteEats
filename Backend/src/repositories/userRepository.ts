import { IUserRepository } from "../interface/User/IUserRepository";
import Cart from "../models/cartModel";
import User from "../models/userModel";
import Vendor from "../models/vendorModel";

class UserRepository implements IUserRepository {
  constructor() {}

  checkExists = async (userData: any) => {
    try {
      console.log("userData:", userData);
      const exists = await User.findOne({
        $or: [{ email: userData.email }, { mobile: userData.mobile }],
      });

      return exists;
    } catch (error) {
      console.log(error);
    }
  };

  saveUser = async (userData: any) => {
    try {
      return await User.create(userData);
    } catch (error) {
      console.log(error);
    }
  };

  loginVerification = async (loginData: any) => {
    try {
      return await User.findOne({ email: loginData.email });
    } catch (error) {
      console.log(error);
    }
  };

  findAdmin = async (loginData: any) => {
    try {
      const admin = await User.findOne({
        email: loginData.email,
        isAdmin: true,
      });
      return admin;
    } catch (error) {
      console.log(error);
    }
  };

  findUsers = async () => {
    try {
      return await User.find({ isAdmin: false }).sort({ registered_On: -1 });
    } catch (error) {
      console.log(error);
    }
  };

  getDetails = async (id: string) => {
    try {
      return await User.findById(id);
    } catch (error) {
      console.log(error);
    }
  };

  block = async (id: string) => {
    try {
      return await User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  unblock = async (id: string) => {
    try {
      return await User.findByIdAndUpdate(
        id,
        { isActive: true },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  findwithEmail = async (email: string) => {
    try {
      return await User.findOne({ email: email });
    } catch (error) {
      console.log(error);
    }
  };

  updatePassword = async (email: any, password: string | any) => {
    try {
      return await User.findOneAndUpdate(
        { email },
        { $set: { password: password } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  getHotels = async () => {
    try {
      return await Vendor.find({}).limit(5);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  getUser = async (userData: any) => {
    try {
      return await User.findOne({ _id: userData }).select(
        "-password -isActive -isAdmin"
      );
    } catch (error) {
      console.log(error);
    }
  };

  findCart = async (id: any) => {
    try {
      console.log(`find if cart exist for the given user with id : ${id}`);

      return await Cart.findOne({ userId: id });
    } catch (error) {
      console.log(error);
    }
  };

  createNewCart = async (data: any) => {
    try {
      return await Cart.create(data);
    } catch (error) {
      console.log(error);
    }
  };

  updateCart = async (userId: any, cart: any) => {
    try {
      return await Cart.findOneAndUpdate(
        { userId },
        {
          $set: {
            items: cart.items,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  getCart = async (id: string) => {
    try {
      return await Cart.findOne({ userId: id });
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserRepository;
