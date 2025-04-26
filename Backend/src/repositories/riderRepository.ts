import Rider from "../models/riderModel.ts";
import User from "../models/userModel.ts";

class RiderRepository {
  constructor() {}

  checkExists = async (riderData) => {
    try {
      return await Rider.findOne({
        $or: [{ email: riderData.email }, { mobile: riderData.mobile }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  saveRider = async (riderData) => {
    try {
      return await Rider.create(riderData);
    } catch (error) {
      console.log(error);
    }
  };

  verifyRider = async (user) => {
    try {
      return await Rider.findOneAndUpdate(
        { email: user.email },
        { $set: { isVerified: true } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  verifyLogin = async (loginData) => {
    try {
      return await Rider.findOne({ email: loginData.email });
    } catch (error) {
      console.log(error);
    }
  };
}

export default RiderRepository;
