import Rider from "../models/riderModel";


class RiderRepository {
  constructor() {}

  checkExists = async (riderData:any) => {
    try {
      return await Rider.findOne({
        $or: [{ email: riderData.email }, { mobile: riderData.mobile }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  saveRider = async (riderData:any) => {
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

  verifyLogin = async (loginData:any) => {
    try {
      return await Rider.findOne({ email: loginData.email });
    } catch (error) {
      console.log(error);
    }
  };
}

export default RiderRepository;
