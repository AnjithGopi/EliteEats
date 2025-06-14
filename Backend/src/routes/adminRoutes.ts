import express from "express";
import container from "../config/inversifyConfig/inversifyConfig";

import { AdminController } from "../controllers/adminController";
//import { authenticateUser } from "../middlewares/verifyToken";

const router = express.Router();

const controller = container.get<AdminController>(AdminController);

router.route("/login").post(controller.login);
router.route("/users").get(controller.getAllusers);
router.route("/users/:id").get(controller.userDetails)
router.route("/users/block/:id").patch(controller.blockUser);
router.route("/users/unblock/:id").patch(controller.unblockUser);
router.route("/restaurents").get(controller.getRestuarentList)

export default router;
