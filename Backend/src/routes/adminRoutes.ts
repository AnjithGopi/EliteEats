import express from "express";
import container from "../config/inversifyConfig/inversifyConfig";

import { AdminController } from "../controllers/adminController";
import verify from "../middlewares/authVerfication";

const router = express.Router();

const controller = container.get<AdminController>(AdminController);

router.route("/login").post(controller.login);
router.route("/users").get(verify, controller.getAllusers);
router.route("/users/:id").get(verify, controller.userDetails);
router.route("/users/block/:id").patch(verify, controller.blockUser);
router.route("/users/unblock/:id").patch(verify, controller.unblockUser);
router.route("/restaurents").get( verify,controller.getRestuarentList);
router.route("/verify_restaurent/:id").patch(controller.verifyRestaurent)

export default router;
