import { IVendorRepository } from "../domain/interface/Vendor/IVendorRepository";
import Vendor from "../models/vendorModel";

export class VendorRepository implements IVendorRepository {
  constructor() {}

  checkExists = async (userData:any) => {
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


  saveRestuarent= async(data:any)=>{

    try {
  
       return await Vendor.create(data)
        
    } catch (error) {
        console.log(error)
        
    }
  }

  findRestaurent= async(loginData:any)=>{

    try {

        return await Vendor.findOne({email:loginData.email})
        
    } catch (error) {
        console.log(error)
        
    }
  }

 




}


