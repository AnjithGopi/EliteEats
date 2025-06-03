import { Container } from "inversify";
import { IUserService } from "../../interface/User/IUserService";
import UserService from "../../services/userService";
import { IUserRepository } from "../../interface/User/IUserRepository";
import UserRepository from "../../repositories/userRepository";
import { userController } from "../../controllers/userController";
import { IAdminService } from "../../interface/Admin/IAdminService";
import AdminService from "../../services/adminServices";
import { AdminController } from "../../controllers/adminController";
import { RiderController } from "../../controllers/riderController";
import { IRiderService } from "../../interface/Rider/IRiderService";
import { IRiderRepository } from "../../interface/Rider/IRiderRepository";
import RiderRepository from "../../repositories/riderRepository";
import { RiderService } from "../../services/riderService";
import { IVendorRepository } from "../../interface/Vendor/IVendorRepository";
import { VendorRepository } from "../../repositories/vendorRepository";
import { IVendorService } from "../../interface/Vendor/IVendorService";
import VendorService from "../../services/vendorService";
import { VendorController } from "../../controllers/vendorController";
import { IPasswordResetRepository } from "../../interface/IPasswordResetRepository";
import { PasswordResetRepository } from "../../repositories/passwordResetRepository";

const container = new Container();
//userbindings
container.bind<IUserService>("IUserService").to(UserService);
container.bind<IUserRepository>("IUserRepository").to(UserRepository);
container.bind<userController>(userController).toSelf();
container
  .bind<IPasswordResetRepository>("IPasswordResetRepository")
  .to(PasswordResetRepository);

//adminbindings
container.bind<IAdminService>("IAdminService").to(AdminService);
container.bind<AdminController>(AdminController).toSelf();

//rider bindings
container.bind<IRiderRepository>("IRiderRepository").to(RiderRepository);
container.bind<IRiderService>("IRiderService").to(RiderService);
container.bind<RiderController>(RiderController).toSelf();

// restaurent bindings
container.bind<IVendorRepository>("IVendorRepository").to(VendorRepository);
container.bind<IVendorService>("IVendorService").to(VendorService);
container.bind<VendorController>(VendorController).toSelf();

export default container;
