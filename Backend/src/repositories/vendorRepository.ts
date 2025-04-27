import Vendor from "../models/vendorModel.ts";

class VendorRepository {
  constructor() {}

  checkExists = async (userData) => {
    try {
      console.log("userData:", userData);
      const exists = await Vendor.findOne({
        email: userData.email,
      });

      return exists;
    } catch (error) {
      console.log(error);
    }
  };


  saveRestuarent= async(data)=>{

    try {

       return await Vendor.create(data)
        
    } catch (error) {
        console.log(error)
        
    }
  }

  findRestaurent= async(loginData)=>{

    try {

        return await Vendor.findOne({email:loginData.email})
        
    } catch (error) {
        console.log(error)
        
    }
  }






}



export default VendorRepository
