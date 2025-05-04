
import { LoginData } from "../domain/interface/Admin/IAdminService";
import { IRider, IRiderRepository } from "../domain/interface/Rider/IRiderRepository";
import Rider from "../models/riderModel";


class RiderRepository implements IRiderRepository {
  constructor() {}

  checkExists = async (riderData:IRider) => {
    try {
      return await Rider.findOne({
        $or: [{ email: riderData.email }, { mobile: riderData.mobile }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  saveRider = async (riderData:IRider) => {
    try {
      return await Rider.create(riderData);
    } catch (error) {
      console.log(error);
    }
  };

  verifyRider = async (user:any) => {
    try {
      return await Rider.findOneAndUpdate(
        { email: user.email },
        { $set: { otpVerified: true } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  verifyLogin = async (loginData:LoginData) => {
    try {
      return await Rider.findOne({ email: loginData.email });
    } catch (error) {
      console.log(error);
    }
  };
}

export default RiderRepository;
