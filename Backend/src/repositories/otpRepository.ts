import Otp from "../models/otpModel";

class OtpRepository {
  constructor() {}

  createOtp = async (email:string, otp:string) => {
    try {
      console.log("email in otp repository:", email);
      console.log("otp in otp repository:", otp);

      return  await Otp.create({
        email: email,
        otp: otp,
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  findbyOtp = async (otpData:any) => {
    try {
      return await Otp.findOne({ otp: otpData.otp });
    } catch (error) {
      console.log(error);
    }
  };


  
}

export default OtpRepository;
