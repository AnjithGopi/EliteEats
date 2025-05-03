import { Container } from "inversify";

import { IUserService } from "../domain/interface/User/IUserService";
import UserService from "../services/userService";


const container = new Container();

container.bind<IUserService>("IUserService").to(UserService).inSingletonScope();

export default container;
