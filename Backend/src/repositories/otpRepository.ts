import Otp from "../models/otpModel.ts";

class OtpRepository {
  constructor() {}

  createOtp = async (email, otp) => {
    try {
      console.log("email in otp repository:", email);
      console.log("otp in otp repository:", otp);

      return  await Otp.create({
        email: email,
        otp: otp,
      });
      
    } catch (error) {
      console.log(error.message);
    }
  };

  findbyOtp = async (otpData) => {
    try {
      return await Otp.findOne({ otp: otpData.otp });
    } catch (error) {
      console.log(error);
    }
  };
}

export default OtpRepository;
