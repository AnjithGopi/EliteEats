import UserRepository from "../repositories/userRepository.ts";
import comparePassword from "../utils/comparePasswords.ts";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.ts";

class AdminService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  findAdmin = async (loginData) => {
    try {
      const admin = await this.userRepository.findAdmin(loginData);

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
      const users = await this.userRepository.findUsers();
      console.log(users)

      if (!users) {
        throw new Error("Something went wrong");
      }

      console.log("users found:",users)

      return users;
    } catch (error) {
      console.log(error);
    }
  };

  findUser=async(id)=>{

    try {

      const user=await this.userRepository.getDetails(id)
      

      return user
      
    } catch (error) {

      console.log(error)
    }
  }

  blockUser=async(id)=>{

    try {

     

      const blocked= await this.userRepository.block(id)
     console.log("BLocked:",blocked)
      if(!blocked){
        throw new Error("Something went wrong")
      }

     return blocked
      
    } catch (error) {

      console.log(error)
      
    }
  }
}

export default AdminService;
