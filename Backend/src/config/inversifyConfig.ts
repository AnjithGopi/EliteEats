import { Container } from "inversify";
import { IUserService } from "../domain/interface/User/IUserService";
import UserService from "../services/userService";
import { IUserRepository } from "../domain/interface/User/IUserRepository";
import UserRepository from "../repositories/userRepository";
import { userController } from "../controllers/userController";

const container = new Container();

container.bind<IUserService>("IUserService").to(UserService);
container.bind<IUserRepository>("IUserRepository").to(UserRepository);
container.bind<userController>(userController).toSelf();

export default container;
