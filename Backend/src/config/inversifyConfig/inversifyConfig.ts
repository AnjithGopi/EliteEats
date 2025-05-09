import { Container } from "inversify";
import { IUserService } from "../../domain/interface/User/IUserService";
import UserService from "../../services/userService";
import { IUserRepository } from "../../domain/interface/User/IUserRepository";
import UserRepository from "../../repositories/userRepository";
import { userController } from "../../controllers/userController";
import { IAdminService } from "../../domain/interface/Admin/IAdminService";
import AdminService from "../../services/adminServices";
import { AdminController } from "../../controllers/adminController";
import { RiderController } from "../../controllers/riderController";
import { IRiderService } from "../../domain/interface/Rider/IRiderService";
import { IRiderRepository } from "../../domain/interface/Rider/IRiderRepository";
import RiderRepository from "../../repositories/riderRepository";
import { RiderService } from "../../services/riderService";
import { IVendorRepository } from "../../domain/interface/Vendor/IVendorRepository";
import { VendorRepository } from "../../repositories/vendorRepository";
import { IVendorService } from "../../domain/interface/Vendor/IVendorService";
import VendorService from "../../services/vendorService";
import { VendorController } from "../../controllers/vendorController";
import { IPasswordResetRepository } from "../../domain/interface/IPasswordResetRepository";
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
