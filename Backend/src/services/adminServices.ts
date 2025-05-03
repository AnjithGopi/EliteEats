import UserRepository from "../repositories/userRepository";
import comparePassword from "../utils/comparePasswords";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

class AdminService {
  private _userRepository: UserRepository;
  constructor() {
    this._userRepository = new UserRepository();
  }

  findAdmin = async (loginData:any) => {
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
        return { ...admin.toObject(), accessToken, refreshToken };
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

      return users;
    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (id:string) => {
    try {
      const user = await this._userRepository.getDetails(id);

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  blockUser = async (id:string) => {
    try {
      const blocked = await this._userRepository.block(id);
      console.log("BLocked:", blocked);
      if (!blocked) {
        throw new Error("Something went wrong");
      }

      return blocked;
    } catch (error) {
      console.log(error);
    }
  };

  unBlockUser = async (id:string) => {
    try {
      const unBlocked = await this._userRepository.unblock(id);

      if (!unBlocked) {
        throw new Error("Something went wrong");
      }

      return unBlocked;
    } catch (error) {
      console.log(error);
    }
  };
}

export default AdminService;
