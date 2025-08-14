import generateOtp from "../utils/generateOtp";
import sendOtp from "../utils/sendIOtp";
import hashPassword from "../utils/hashPassword";
import comparePassword from "../utils/comparePasswords";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { IUserService } from "../interface/User/IUserService";
import { inject, injectable } from "inversify";
import { IUserRepository } from "../interface/User/IUserRepository";
//import { LoginData, LocationData } from "../interface/Admin/IAdminService";
import { LoginData } from "../types/loginData";
import { LocationData } from "../types/LocationData";
import redisVerificationToken from "../utils/redisverificaton";
import redisClient from "../config/redis";
import { passwordResetToken } from "../utils/password _reset";
import { IPasswordResetRepository } from "../interface/IPasswordResetRepository";
import { sendPasswordResetLink } from "../utils/sendResetLink";
import { generate_userId } from "../utils/generate_userid";
import { IVendorRepository } from "../interface/Vendor/IVendorRepository";
import { Roles } from "../utils/roles";
import { createOrderId } from "../utils/createOrderId";

@injectable()
class UserService implements IUserService {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IPasswordResetRepository")
    private _passwordResetRepository: IPasswordResetRepository,
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository
  ) {}

  register = async (userData: any) => {
    console.log(userData);
    try {
      const existingUser = await this._userRepository.checkExists(userData);

      if (existingUser) {
        throw new Error("User already exists");
      }

      const password = await hashPassword(userData.password);
      const userId = generate_userId();

      const userToSave = { ...userData, password: password, userId }; // creating new user object with hashed password
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
      const loginCredentials = {
        email: loginData.email,
        password: loginData.password,
      };

      const user = await this._userRepository.loginVerification(
        loginCredentials
      );

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

      const location = {
        latitude: loginData.location?.latitude,
        longitude: loginData.location?.longitude,
      };

      const timestamp = new Date();
      const userId = user._id;

      const userWithLocation = await this._userRepository.saveUserLocation({
        location,
        timestamp,
        userId,
      });

      const role = Roles.USER;
      const accessToken = generateAccessToken(user, role);
      const refreshToken = generateRefreshToken(user, role);

      return {
        _id: userWithLocation._id,
        name: userWithLocation.name,
        email: userWithLocation.email,
        mobile: userWithLocation.mobile,
        role: role,
        accessToken,
        refreshToken,
      };
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
      const role = Roles.USER;
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

  getHotels = async () => {
    try {
      const hotels = await this._userRepository.getHotels();

      if (!hotels) {
        throw new Error("no hotels found");
      }

      const data = hotels.map((hotel: any) => {
        return {
          name: hotel.name,
          _id: hotel._id,
          displayPicture: hotel.displayPicture,
        };
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (userId: any) => {
    try {
      const user = await this._userRepository.getUser(userId);

      if (!user) {
        throw new Error("no user found , something went wrong");
      }

      console.log(user);

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  fetchRestaurentData = async (id: string) => {
    try {
      const data = await this._userRepository.fetchData(id);
      if (!data) {
        throw new Error(
          "Something went wrong! cannot fetch restaurent details"
        );
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  createOrder = async (data: any) => {
    try {
      console.log("Incoming order data:", data);

      const orderId = createOrderId();

      const userId = data.userId;
      const hotelId = data.hotelId;

      const products = data.products.map((item: any) => ({
        productName: item[0],
        quantity: item[1],
        hotelId: hotelId,
      }));

      const totalAmount = data.subtotal + data.tax + data.deliveryfee;

      const orderData = {
        orderId,
        userId,
        products,
        totalAmount,
        paymentMethod: data.paymentMethod,
      };

      const createdOrder = await this._userRepository.placeOrder(orderData);

      if (!createdOrder) {
        throw new Error("Failed to save order to database");
      }

      console.log("Order created successfully:", createdOrder);
      return createdOrder;
    } catch (error) {
      console.log(error);
    }
  };

  itemDetail = async (id: string) => {
    try {
      const itemFound = await this._userRepository.findItem(id);

      return itemFound;
    } catch (error) {
      console.log(error);
    }
  };

  fetchOrders = async (id: string) => {
    try {
      const orders = await this._userRepository.findallOrders(id);

      return orders;
    } catch (error) {
      console.log(error);
    }
  };

  updateUser = async (data: any) => {
    try {
      console.log("data to save:", data);

      const updateUser = await this._userRepository.updateUser(data);
      return updateUser;
    } catch (error) {
      console.log(error);
    }
  };

  hotelsNearUser = async (id: string) => {
    try {
      const location = await this._userRepository.fetchLocation(id);

      console.log("Location found for the user:", location);
      console.log("latitude:", location.latitude);
      console.log("longitude:", location.longitude);

      const restaurents = await this._userRepository.findWithLocation(
        location.longitude,
        location.latitude
      );

      console.log(restaurents);

      return restaurents;
    } catch (error) {
      console.log(error);
    }
  };

  deleteCart = async (id: string) => {
    try {
      const clear_cart = await this._userRepository.clear(id);

      return clear_cart;
    } catch (error) {
      console.log(error);
    }
  };

  addressManagement = async (data: any) => {
    try {
      const { street, city, state, country, pincode, userId } = data;

      const addressPayload = {
        userId,
        addresses: {
          street,
          city,
          state,
          country,
          pinCode: pincode,
        },
      };

      const addAdress = await this._userRepository.createAddress(
        addressPayload
      );

      return addAdress;
    } catch (error) {
      console.log(error);
    }
  };

  fetchAddressOfuser = async (id: string) => {
    try {
      const address = await this._userRepository.findAddress(id);

      const addressStrings = address.map((item: any) =>
        Object.values(item.addresses).join(" ,")
      );

      return addressStrings;
    } catch (error) {
      console.log(error);
    }
  };

  resetPassword = async (data: any) => {
    try {
      console.log("data for changing password:", data);
      const { currentPassword, newPassword, userId, confirmPassword } = data;

      if (newPassword !== confirmPassword) {
        throw new Error("New passwords do not match");
      }

      const user = await this._userRepository.finduserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await comparePassword(currentPassword, user.password);
      if (!isMatch) {
        throw new Error("Current password is incorrect");
      }

      const hashedPassword = await hashPassword(newPassword);
      console.log("hashed password type:", typeof hashedPassword);
      const updated = await this._userRepository.updateUserPassword(
        userId,
        hashedPassword
      );

      // return { success: true, message: "Password updated successfully" };
      if (updated) {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserService;
