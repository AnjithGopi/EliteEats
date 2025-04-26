import OtpRepository from "../repositories/otpRepository.ts";
import RiderRepository from "../repositories/riderRepository.ts";
import generateOtp from "../utils/generateOtp.ts";
import hashPassword from "../utils/hashPassword.ts";
import sendOtp from "../utils/sendIOtp.ts";

class RiderService {
  private riderRepository: RiderRepository;
  private otpRepository: OtpRepository;

  constructor() {
    this.riderRepository = new RiderRepository();
    this.otpRepository = new OtpRepository();
  }

  register = async (riderData) => {
    try {
      console.log("riderData:", riderData);

      const existingRider = await this.riderRepository.checkExists(riderData);

      if (existingRider) {
        throw new Error("User already exists");
      }

      const hashedPassword = await hashPassword(riderData.password);

      const riderToSave = {
        ...riderData,
        password: hashedPassword,
      };

      const savedRider = await this.riderRepository.saveRider(riderToSave);

      const otp = generateOtp();

      const saveOtp = savedRider
        ? await this.otpRepository.createOtp(savedRider.email, otp)
        : undefined;
      saveOtp && savedRider ? await sendOtp(saveOtp.email, otp) : undefined;

      return { message: "OTP send successfully" };
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp=async(otp)=>{
    try {

        const user=await  this.otpRepository.findbyOtp(otp)

        if(!user){
            throw new Error("Incorrect otp")
        }

        const data= await this.riderRepository.verifyRider(user)

        if(data){
            return data
        }else{

            throw new Error("Failed to verify otp")
        }
        
    } catch (error) {
        console.log(error)
        
    }
  }
}

export default RiderService;
