import { Container } from "inversify";
import { IUserService } from "../domain/interface/User/IUserService";
import UserService from "../services/userService";
import { IUserRepository } from "../domain/interface/User/IUserRepository";
import UserRepository from "../repositories/userRepository";
import { userController } from "../controllers/userController";
import { AdminController } from "../controllers/adminController";
import { IAdminService } from "../domain/interface/Admin/IAdminService";
import AdminService from "../services/adminServices";


const container = new Container();

container.bind<IUserService>("IUserService").to(UserService).inSingletonScope();
container.bind<IUserRepository>("IUserRepository").to(UserRepository).inSingletonScope()
container.bind<IAdminService>("IAdminService").to(AdminService)
container.bind<userController>(userController).toSelf()
container.bind<AdminController>(AdminController).toSelf()

export default container;
