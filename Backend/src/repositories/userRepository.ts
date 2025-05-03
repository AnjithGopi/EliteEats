import User from "../models/userModel";

class UserRepository {
  constructor() {}

  checkExists = async (userData:any) => {
    try {
      console.log("userData:", userData);
      const exists = await User.findOne({
        $or: [
          { email: userData.email },
          { mobile: userData.mobile },
          //{ isVerified: true },
        ],
      });

      return exists;
    } catch (error) {
      console.log(error);
    }
  };

  saveUser = async (userData:any) => {
    try {
      const user = await User.create(userData);
      console.log("user saved without verification :", user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  verify = async (data:any) => {
    try {
      return await User.findOneAndUpdate(
        { email: data.email },
        { $set: { otpVerified: true } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  loginVerification = async (loginData:any) => {
    try {
      return await User.findOne({ email: loginData.email });
    } catch (error) {
      console.log(error);
    }
  };

  findAdmin = async (loginData:any) => {
    try {
      const admin = await User.findOne({
        email: loginData.email,
        isAdmin: true,
      });
      return admin;
    } catch (error) {
      console.log(error);
    }
  };

  findUsers = async () => {
    try {
      return await User.find({ otpVerified: true, isAdmin: false });
    } catch (error) {
      console.log(error);
    }
  };

  getDetails = async (id:string) => {
    try {
      return await User.findById(id);
    } catch (error) {
      console.log(error);
    }
  };

  block = async (id:string) => {
    try {
      return await User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  unblock=async(id:string)=>{
    try {

      return await User.findByIdAndUpdate(id,{isActive:true},{new :true})
      
    } catch (error) {
      console.log(error)
      
    }
  }
}

export default UserRepository;
