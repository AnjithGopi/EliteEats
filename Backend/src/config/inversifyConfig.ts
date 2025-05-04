import { Container } from "inversify";

import { IUserService } from "../domain/interface/User/IUserService";
import UserService from "../services/userService";
import { IUserRepository } from "../domain/interface/User/IUserRepository";
import UserRepository from "../repositories/userRepository";


const container = new Container();

container.bind<IUserService>("IUserService").to(UserService).inSingletonScope();
container.bind<IUserRepository>("IUserRepository").to(UserRepository).inSingletonScope()

export default container;
