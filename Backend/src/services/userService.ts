import UserRepository from "../repositories/userRepository.ts";
import generateOtp from "../utils/generateOtp.ts";
import sendOtp from "../utils/sendIOtp.ts";
import OtpRepository from "../repositories/otpRepository.ts";

class UserService {
  private userRepository: UserRepository;
  private otpRepository: OtpRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.otpRepository = new OtpRepository();
  }

  register = async (userData) => {
    try {
      const existingUser = await this.userRepository.checkExists(userData);

      if (existingUser) {
        throw new Error("User already exists");
      }

      let savedUser = await this.userRepository.saveUser(userData);
      const otp = generateOtp();

      const saveOtp = savedUser
        ? await this.otpRepository.createOtp(savedUser.email, otp)
        : undefined;
      saveOtp ? await sendOtp(saveOtp.email, saveOtp.otp) : undefined;

      return { message: "OTP send successfully" };

    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (otpData) => {
    let data = await this.otpRepository.findbyOtp(otpData);

    if (!data) {
      throw new Error("incorrect otp");
    }

    return data;
  };

  verifyUser = async (data) => {
    try {
      console.log("data in verifyUser:", data);
      const isVerified = await this.userRepository.verify(data);
      if (!isVerified) {
        throw new Error("Invalid otp");
      }

      return isVerified;
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserService;
