import { LoginData } from "../interface/Admin/IAdminService";
import { IRider, IRiderRepository } from "../interface/Rider/IRiderRepository";
import Rider from "../models/riderModel";

class RiderRepository implements IRiderRepository {
  constructor() {}

  checkExists = async (riderData: IRider) => {
    try {
      return await Rider.findOne({
        $or: [{ email: riderData.email }, { mobile: riderData.mobile }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  saveRider = async (riderData: IRider) => {
    try {
      return await Rider.create(riderData);
    } catch (error) {
      console.log(error);
    }
  };

  verifyRider = async (user: any) => {
    try {
      return await Rider.findOneAndUpdate(
        { email: user.email },
        { $set: { otpVerified: true } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  verifyLogin = async (loginData: LoginData) => {
    try {
      return await Rider.findOne({ email: loginData.email });
    } catch (error) {
      console.log(error);
    }
  };

  updateRider = async (data: any) => {
    try {
      const updateData = {
        vehicleType: data.vehicleType,
        license: data.drivingLicenseUrl,
        address: {
          fullAddress: data.fullAddress,
          city: data.city,
          state: data.state,
          zipCode: data.postalCode,
        },
      };

      return await Rider.findOneAndUpdate(
        { _id: data.riderId },
        { $set: updateData },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  riders = async () => {
    try {
      return await Rider.find();
    } catch (error) {
      console.log(error);
    }
  };

  getDetails = async (id: string) => {
    try {
      return await Rider.findOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  };

  verfiyRiderDetails = async (id: string) => {
    try {
      return await Rider.findOneAndUpdate(
        { _id: id },

        {
          $set: {
            isVerified: true,
          },
        },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  reject = async (id: string, reason: string) => {
    try {
      const updatedRider = await Rider.findOneAndUpdate(
        { _id: id },
        { $set: { isRejected: true, rejectionReason: reason } },
        { new: true }
      );

      if (!updatedRider) {
        console.log(`Rider with ID ${id} not found.`);
      }

      return updatedRider;
    } catch (error) {
      console.error(`Error rejecting rider with ID ${id}:`, error);
      return null;
    }
  };
}

export default RiderRepository;
