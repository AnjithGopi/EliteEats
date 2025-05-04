import { Container } from "inversify";
import { IUserService } from "../../domain/interface/User/IUserService";
import UserService from "../../services/userService";
import { IUserRepository } from "../../domain/interface/User/IUserRepository";
import UserRepository from "../../repositories/userRepository";
import { userController } from "../../controllers/userController";

const userContainer = new Container();

userContainer.bind<IUserService>("IUserService").to(UserService);
userContainer.bind<IUserRepository>("IUserRepository").to(UserRepository);
userContainer.bind<userController>(userController).toSelf();

export default userContainer;
