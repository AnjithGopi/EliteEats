import User from "../models/userModel.ts";

class UserRepository {
  constructor() {}

  checkExists = async (userData) => {
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

  saveUser = async (userData) => {
    try {
      const user = await User.create(userData);
      console.log("user saved without verification :", user);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  verify = async (data) => {
    try {
      return await User.findOneAndUpdate(
        { email: data.email },
        { $set: { otpVerified: true } }
      );
    } catch (error) {
      console.log(error.message);
    }
  };


  loginVerification=async(loginData)=>{

    try {

        return await User.findOne({email:loginData.email})
        
    } catch (error) {
        console.log(error)
        
    }
  }

  findAdmin=async(loginData)=>{

    try {

        const admin= await User.findOne({email:loginData.email,isAdmin:true})
        return admin
        
    } catch (error) {
        console.log(error)
        
    }
  }

  
}

export default UserRepository;
