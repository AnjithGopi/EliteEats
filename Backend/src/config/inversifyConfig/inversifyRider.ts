import { Container } from "inversify";
import { IRiderRepository } from "../../domain/interface/Rider/IRiderRepository";
import RiderRepository from "../../repositories/riderRepository";
import { IRiderService } from "../../domain/interface/Rider/IRiderService";
import { RiderService } from "../../services/riderService";
import { RiderController } from "../../controllers/riderController";

const riderContainer = new Container();

riderContainer.bind<IRiderRepository>("IRiderRepository").to(RiderRepository);
riderContainer.bind<IRiderService>("IRiderService").to(RiderService);
riderContainer.bind<RiderController>(RiderController).toSelf();

export default riderContainer;
