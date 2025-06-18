import { IVendorRepository } from "../interface/Vendor/IVendorRepository";
import Vendor from "../models/vendorModel";
import Menu from "../models/menuModel";

export class VendorRepository implements IVendorRepository {
  constructor() {}

  checkExists = async (userData: any) => {
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

  saveRestuarent = async (data: any) => {
    try {
      console.log("Saving in progress restaurent:", data);

      return await Vendor.create(data);
    } catch (error) {
      console.log(error);
    }
  };

  restaurents = async () => {
    try {
      return await Vendor.find({ isActive: true });
    } catch (error) {
      console.log(error);
    }
  };

  findRestaurent = async (loginData: any) => {
    try {
      return await Vendor.findOne({ email: loginData.email });
    } catch (error) {
      console.log(error);
    }
  };

  checkItemExist = async (data: any) => {
    try {
      return await Menu.findOne({ name: data.name });
    } catch (error) {
      console.log(error);
    }
  };

  saveMenu = async (data: any) => {
    try {
      const menu = await Menu.create(data);
      console.log(menu);
      return menu;
    } catch (error) {
      console.log(error);
    }
  };

  findhotel = async (id: string) => {
    try {
      return await Vendor.findByIdAndUpdate(id, {
        adminVerified: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
