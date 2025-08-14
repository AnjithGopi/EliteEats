import { injectable, inject } from "inversify";
import { IAdminService } from "../interface/Admin/IAdminService";
import { LoginData } from "../types/loginData";
import comparePassword from "../utils/comparePasswords";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { IUserRepository } from "../interface/User/IUserRepository";
import { IVendorRepository } from "../interface/Vendor/IVendorRepository";
import { sendVerificationMail } from "../utils/verfification_mail";
import { Roles } from "../utils/roles";
import { IRiderRepository } from "../interface/Rider/IRiderRepository";
import { sendRejectionMailtoRider } from "../utils/rejectionMail";

@injectable()
class AdminService implements IAdminService {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IVendorRepository") private _vendorRepository: IVendorRepository,
    @inject("IRiderRepository") private _riderRepository: IRiderRepository
  ) {}

  findAdmin = async (loginData: LoginData) => {
    try {
      const admin = await this._userRepository.findAdmin(loginData);

      console.log("ADMIN FOUND:", admin);

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

      const role = Roles.ADMIN;

      if (admin && passwordMatch) {
        const accessToken = generateAccessToken(admin, role);
        const refreshToken = generateRefreshToken(admin, role);

        const data = {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          mobile: admin.mobile,
          role: role,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };

        return data;
      }
      return { message: "login failed" };
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
          createdAt: userObject.registered_On,
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
        ...userDoc.toObject(),
        _id: userDoc._id.toString(),
      };
      console.log("User details from id:", user);
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
        ...blocked.toObject(),
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
        ...unBlocked.toObject(),
        _id: unBlocked._id.toString(),
      };

      return unblockedUser;
    } catch (error) {
      console.log(error);
    }
  };

  getRestaurents = async () => {
    try {
      const restaurents = await this._vendorRepository.restaurents();

      if (!restaurents) {
        throw new Error("Something went wrong, unable to fetch restuarents");
      }

      const transformedData = restaurents.map((item: any) => {
        return {
          _id: item._id,
          restuarentId: item.restaurentId,
          name: item.name,
          mobile: item.phone,
          email: item.email,
          description: item.description,
          isActive: item.isActive,
          adminVerified: item.adminVerified,
          createdAt: item.createdAt,
        };
      });

      return transformedData;
    } catch (error) {
      console.log(error);
    }
  };

  findRestaurent = async (id: string) => {
    try {
      const verified = await this._vendorRepository.findhotel(id);

      if (!verified) {
        throw new Error("Something went wrong");
      }

      if (verified) {
        await sendVerificationMail(verified.email);
      }

      return verified;
    } catch (error) {
      console.log(error);
    }
  };

  gerOrders = async () => {
    try {
      return await this._userRepository.findOrders();
    } catch (error) {
      console.log(error);
    }
  };

  findAllRiders = async () => {
    try {
      return await this._riderRepository.riders();
    } catch (error) {
      console.log(error);
    }
  };

  findRider = async (id: string) => {
    try {
      const rider = await this._riderRepository.getDetails(id);

      if (rider) {
        let data = {
          _id: rider._id,
          name: rider.name,
          email: rider.email,
          mobile: rider.mobile,
          address: rider.address.fullAddress,
          city: rider.address.city,
          state: rider.address.state,
          license: rider.license,
          isActive: rider.isActive,
        };

        return data;
      } else {
        throw new Error("No user found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateRider = async (id: string) => {
    try {
      return await this._riderRepository.verfiyRiderDetails(id);
    } catch (error) {
      console.log(error);
    }
  };

  rejectRiderRequest=async(id:string,reason:string)=>{

    try {

      const rejected= await this._riderRepository.reject(id,reason)

      if(rejected){
        await sendRejectionMailtoRider(rejected.email,rejected.rejectionReason)
      }

      return rejected
      
    } catch (error) {
      console.log(error)
      
    }
  }
}

export default AdminService;
