// import { LoginData } from "../types/loginData";
// import { LocationData } from "../types/LocationData";
// import { IUserRepository } from "../interface/User/IUserRepository";
// import Cart from "../models/cartModel";
// import MenuCategory from "../models/menuCategoryModel";
// import Menu from "../models/menuModel";
// import Order from "../models/orderModel";
// import User from "../models/userModel";
// import Vendor from "../models/vendorModel";
// import Address from "../models/userOrderAddress";
// import { UserLocation } from "../types/userLocation";

// class UserRepository implements IUserRepository {
//   constructor() {}

//   checkExists = async (userData: any) => {
//     try {
//       console.log("userData:", userData);
//       const exists = await User.findOne({
//         $or: [{ email: userData.email }, { mobile: userData.mobile }],
//       });

//       return exists;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   saveUser = async (userData: any) => {
//     try {
//       return await User.create(userData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   loginVerification = async (loginData: LoginData) => {
//     try {
//       return await User.findOne({ email: loginData.email });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   saveUserLocation = async (data: UserLocation) => {
//     try {
//       const loginEntry = {
//         timestamp: data.timestamp,
//         location: {
//           type: "Point",
//           coordinates: [data.location.longitude, data.location.latitude],
//         },
//       };

//       return await User.findOneAndUpdate(
//         { _id: data.userId },
//         { $push: { loginHistory: loginEntry } },
//         { new: true }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   findAdmin = async (loginData: any) => {
//     try {
//       const admin = await User.findOne({
//         email: loginData.email,
//         isAdmin: true,
//       });
//       return admin;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   findUsers = async () => {
//     try {
//       return await User.find({ isAdmin: false }).sort({ registered_On: -1 });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getDetails = async (id: string) => {
//     try {
//       return await User.findById(id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   block = async (id: string) => {
//     try {
//       return await User.findByIdAndUpdate(
//         id,
//         { isActive: false },
//         { new: true }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   unblock = async (id: string) => {
//     try {
//       return await User.findByIdAndUpdate(
//         id,
//         { isActive: true },
//         { new: true }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   findwithEmail = async (email: string) => {
//     try {
//       return await User.findOne({ email: email });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   updatePassword = async (email: any, password: string | any) => {
//     try {
//       return await User.findOneAndUpdate(
//         { email },
//         { $set: { password: password } },
//         { new: true }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   getHotels = async () => {
//     try {
//       const hotels = await Vendor.find({ isActive: true, adminVerified: true });
//       return hotels;
//     } catch (error) {
//       console.log(error);
//       return [];
//     }
//   };

//   getUser = async (userData: any) => {
//     try {
//       return await User.findOne({ _id: userData }).select(
//         "-password -isActive -isAdmin"
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fetchData = async (id: string) => {
//     try {
//       const [hotel, category, menu] = await Promise.all([
//         Vendor.findOne({ _id: id }),
//         MenuCategory.find({ hotelId: id }),
//         Menu.find({ hotelId: id }),
//       ]);

//       return { hotel, category, menu };
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   placeOrder = async (data: any) => {
//     try {
//       console.log("data in repository:", data);
//       return await Order.create(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   findItem = async (id: string) => {
//     try {
//       const item = await Menu.findOne({ _id: id });
//       console.log("item found:", item);
//       return item;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   findOrders = async () => {
//     try {
//       const orders = await Order.find();

//       return orders;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   findallOrders = async (id: string) => {
//     try {
//       const orders = await Order.find({ userId: id });

//       return orders;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   updateUser = async (data: any) => {
//     try {
//       const updateData = {
//         address: {
//           fullAddress: data.address,
//           city: data.city,
//           zipcode: data.zipcode,
//           state: data.state,
//         },
//       };

//       const update = await User.findOneAndUpdate(
//         { _id: data.id },
//         { $set: updateData },
//         { new: true }
//       );

//       console.log("User updated:", update);
//       return update;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fetchLocation = async (id: string) => {
//     try {
//       const user = await User.findById(id);
//       console.log("User found for location", user);

//       if (user && user.loginHistory.length > 0) {
//         const recentLogin = user.loginHistory.pop();
//         console.log("Recent login", recentLogin);

//         if (recentLogin?.location?.coordinates) {
//           const [longitude, latitude] = recentLogin.location.coordinates;

//           if (typeof longitude === "number" && typeof latitude === "number") {
//             console.log(longitude, latitude);
//             return { longitude, latitude };
//           } else {
//             throw new Error(
//               "Invalid coordinates: longitude or latitude is not a number"
//             );
//           }
//         }
//       }

//       throw new Error("No valid login history with coordinates found");
//     } catch (error) {
//       console.error("fetchLocation error:", error);
//       throw error; // important to let upstream catch it
//     }
//   };

//   findWithLocation = async (
//     longitude: number,
//     latitude: number,
//     maxDistanceKm = 20
//   ) => {
//     try {
//       const nearbyRestaurants = await Vendor.find({
//         location: {
//           $near: {
//             $geometry: {
//               type: "Point",
//               coordinates: [longitude, latitude],
//             },
//             $maxDistance: 100000, //100 km
//           },
//         },
//         isActive: true,
//         adminVerified: true,
//       });

//       console.log("resturents found:", nearbyRestaurants);

//       return nearbyRestaurants;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   clear = async (id: string) => {
//     try {
//       const clearedCart = await Cart.findOneAndDelete({ userId: id });

//       console.log("Cart cleared:", clearedCart);
//       return clearedCart;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   createAddress = async (data: any) => {
//     try {
//       return await Address.create(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   findAddress = async (id: string) => {
//     try {
//       return await Address.find({ userId: id });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   finduserById = async (id: string) => {
//     try {
//       return await User.findOne({ _id: id });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   updateUserPassword = async (id: string, hashedPassword: any) => {
//     try {
//       return await User.findByIdAndUpdate(
//         id,
//         { password: hashedPassword },
//         { new: true }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

// export default UserRepository;

// // import User from "../models/userModel";
// // import { IUserRepository } from "../interface/User/IUserRepository";
// // import BaseRepository from "./BaseRepository/BaseRepository";
// // import { LoginData } from "../types/loginData";
// // import { UserLocation } from "../types/userLocation";

// // class UserRepository extends BaseRepository<typeof User> implements IUserRepository {
// //   constructor() {
// //     super(User);
// //   }

// //   checkExists = async (userData: any) => {
// //     return await this.findOne({
// //       $or: [{ email: userData.email }, { mobile: userData.mobile }],
// //     });
// //   };

// //   loginVerification = async (loginData: LoginData) => {
// //     return await this.findOne({ email: loginData.email });
// //   };

// //   saveUserLocation = async (data: UserLocation) => {
// //     const loginEntry = {
// //       timestamp: data.timestamp,
// //       location: {
// //         type: "Point",
// //         coordinates: [data.location.longitude, data.location.latitude],
// //       },
// //     };

// //     return await this.updateById(data.userId, {
// //       $push: { loginHistory: loginEntry },
// //     });
// //   };

// //   findAdmin = async (loginData: any) => {
// //     return await this.findOne({ email: loginData.email, isAdmin: true });
// //   };

// //   findUsers = async () => {
// //     return await this.findAll({ isAdmin: false }).sort({ registered_On: -1 });
// //   };

// //   block = async (id: string) => {
// //     return await this.updateById(id, { isActive: false });
// //   };

// //   unblock = async (id: string) => {
// //     return await this.updateById(id, { isActive: true });
// //   };

// //   updatePassword = async (email: string, password: string) => {
// //     return await this.updateOne({ email }, { password });
// //   };
// // }

// // export default UserRepository;

import User, { IUser, UserDocument } from "../models/userModel";
import Vendor from "../models/vendorModel";
import MenuCategory from "../models/menuCategoryModel";
import Menu from "../models/menuModel";
import Order from "../models/orderModel";
import Cart from "../models/cartModel";
import Address from "../models/userOrderAddress";
import BaseRepository from "./BaseRepository/BaseRepository";
import { IUserRepository } from "../interface/User/IUserRepository";
import { LoginData } from "../types/loginData";
import { UserLocation } from "../types/userLocation";

class UserRepository
  extends BaseRepository<UserDocument>
  implements IUserRepository
{
  constructor() {
    super(User);
  }

  checkExists = async (userData: Partial<IUser>) => {
    return this.findOne({
      $or: [{ email: userData.email }, { mobile: userData.mobile }],
    });
  };

  findwithEmail = async (email: string) => {
    try {
      return this.findOne({ email: email });
    } catch (error) {
      console.log(error);
    }
  };

  findItem = async (id: string) => {
    try {
      const item = await Menu.findOne({ _id: id });
      console.log("item found:", item);
      return item;
    } catch (error) {
      console.log(error);
    }
  };

  getUser = async (userData: any) => {
    try {
      return await User.findOne({ _id: userData }).select(
        "-password -isActive -isAdmin"
      );
    } catch (error) {
      console.log(error);
    }
  };

  saveUser = async (userData: Partial<IUser>) => {
    return this.create(userData);
  };

  loginVerification = async (loginData: LoginData) => {
    return this.findOne({ email: loginData.email });
  };

  saveUserLocation = async (data: UserLocation) => {
    const loginEntry = {
      timestamp: data.timestamp,
      location: {
        type: "Point",
        coordinates: [data.location.longitude, data.location.latitude],
      },
    };

    // return this.updateById(data.userId, { $push: { loginHistory: loginEntry } });
    return this.updateOne(
      { _id: data.userId },
      { $push: { loginHistory: loginEntry } }
    );
  };

  getDetails = async (id: string) => {
    try {
      return this.findById(id);
    } catch (error) {
      console.log(error);
    }
  };

  findAdmin = async (loginData: { email: string }) => {
    return this.findOne({ email: loginData.email, isAdmin: true });
  };

  findUsers = async () => {
    return await User.find({ isAdmin: false }).sort({ registered_On: -1 });
  };

  block = async (id: string) => {
    return this.updateById(id, { isActive: false });
  };

  unblock = async (id: string) => {
    return this.updateById(id, { isActive: true });
  };

  updatePassword = async (email: string, password: string) => {
    return this.updateOne({ email }, { password });
  };

  getHotels = async () => {
    return Vendor.find({ isActive: true, adminVerified: true });
  };

  fetchData = async (id: string) => {
    const [hotel, category, menu] = await Promise.all([
      Vendor.findById(id),
      MenuCategory.find({ hotelId: id }),
      Menu.find({ hotelId: id }),
    ]);

    return { hotel, category, menu };
  };

  placeOrder = async (data: any) => {
    return Order.create(data);
  };

  clear = async (id: string) => {
    return Cart.findOneAndDelete({ userId: id });
  };

  createAddress = async (data: any) => {
    return Address.create(data);
  };

  findAddress = async (id: string) => {
    return Address.find({ userId: id });
  };

  fetchLocation = async (id: string) => {
    try {
      const user = await User.findById(id);
      console.log("User found for location", user);

      if(user?.loginHistory)

      if (user && user.loginHistory.length > 0) {
        const recentLogin = user.loginHistory.pop();
        console.log("Recent login", recentLogin);

        if (recentLogin?.location?.coordinates) {
          const [longitude, latitude] = recentLogin.location.coordinates;

          if (typeof longitude === "number" && typeof latitude === "number") {
            console.log(longitude, latitude);
            return { longitude, latitude };
          } else {
            throw new Error(
              "Invalid coordinates: longitude or latitude is not a number"
            );
          }
        }
      }

      throw new Error("No valid login history with coordinates found");
    } catch (error) {
      console.error("fetchLocation error:", error);
      throw error; // important to let upstream catch it
    }
  };
}

export default UserRepository;
