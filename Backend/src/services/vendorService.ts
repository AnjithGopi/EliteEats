import VendorRepository from "../repositories/vendorRepository.ts";
import comparePassword from "../utils/comparePasswords.ts";
import hashPassword from "../utils/hashPassword.ts";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.ts";

class VendorService {
  private vendorRepository: VendorRepository;

  constructor() {
    this.vendorRepository = new VendorRepository();
  }

  register = async (vendorData) => {
    try {
      const existingUser = await this.vendorRepository.checkExists(vendorData);

      if (existingUser) {
        throw new Error(" Restaurent already exists");
      }

      const password = await hashPassword(vendorData.password);

      const userToSave = { ...vendorData, password: password }; // creating new restaurent object with hashed password

      const savedUser = await this.vendorRepository.saveRestuarent(userToSave);

      if (!savedUser) {
        throw new Error("Error in saving restuarent details");
      }

      return savedUser;
    } catch (error) {
      console.log(error);
    }
  };

  login = async (loginData) => {
    try {
      const verified = await this.vendorRepository.findRestaurent(loginData);

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
        const accessToken = generateAccessToken(verified);
        const refreshToken = generateRefreshToken(verified);

        return { ...verified.toObject(), accessToken, refreshToken };
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  };
}

export default VendorService;
