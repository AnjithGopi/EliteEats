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
}

export default AdminService;
