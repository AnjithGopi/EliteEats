import { Container } from "inversify";
import { IAdminService } from "../../domain/interface/Admin/IAdminService";
import AdminService from "../../services/adminServices";
import { AdminController } from "../../controllers/adminController";

const adminContainer = new Container();

adminContainer.bind<IAdminService>("IAdminService").to(AdminService);
adminContainer.bind<AdminController>(AdminController).toSelf();

export default adminContainer;
