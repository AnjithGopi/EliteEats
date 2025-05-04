import { injectable, inject } from "inversify";
import {
  IAdminService,
  LoginData,
} from "../domain/interface/Admin/IAdminService";
import comparePassword from "../utils/comparePasswords";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { IUserRepository } from "../domain/interface/User/IUserRepository";

@injectable()
class AdminService implements IAdminService {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository
  ) {}

  findAdmin = async (loginData: LoginData) => {
    try {
      const admin = await this._userRepository.findAdmin(loginData);

      if (!admin) {
        throw new Error("Incorrect email");
      }

      const passwordMatch = await comparePassword(
        loginData.password,
        admin.password
      );

      if (!passwordMatch) {
        throw new Error("Incorrect Password");
      }

      if (admin && passwordMatch) {
        const accessToken = generateAccessToken(admin);
        const refreshToken = generateRefreshToken(admin);
        return { accessToken, refreshToken };
      }
      return false;
    } catch (error) {
      console.log(error);
    }
  };

  findUsers = async () => {
    try {
      const users = await this._userRepository.findUsers();
      console.log(users);

      if (!users) {
        throw new Error("Something went wrong");
      }

      console.log("users found:", users);

      // Properly transform each user in the array
      const transformedUsers = users.map((user) => {
        const userObject = user.toObject();
        return {
          _id: userObject._id.toString(), // Convert ObjectId to string
          name: userObject.name,
          email: userObject.email,
          mobile: userObject.mobile,
          isActive: userObject.isActive,
          otpVerified: userObject.otpVerified,
          isAdmin: userObject.isAdmin,
          createdAt: userObject.createdAt,
        };
      });
      return transformedUsers;
    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (id: string) => {
    try {
      const userDoc = await this._userRepository.getDetails(id);

      if (!userDoc) {
        throw new Error("No users found");
      }

      const user = {
        ...userDoc,
        _id: userDoc._id.toString(),
      };

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  blockUser = async (id: string) => {
    try {
      const blocked = await this._userRepository.block(id);
      console.log("BLocked:", blocked);
      if (!blocked) {
        throw new Error("Something went wrong");
      }

      const blockedUser = {
        ...blocked,
        _id: blocked._id.toString(),
      };

      return blockedUser;
    } catch (error) {
      console.log(error);
    }
  };

  unBlockUser = async (id: string) => {
    try {
      const unBlocked = await this._userRepository.unblock(id);

      if (!unBlocked) {
        throw new Error("Something went wrong");
      }

      const unblockedUser = {
        ...unBlocked,
        _id: unBlocked._id.toString(),
      };

      return unblockedUser;
    } catch (error) {
      console.log(error);
    }
  };
}

export default AdminService;
