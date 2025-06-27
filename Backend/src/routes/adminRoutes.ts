import express from "express";
import container from "../config/inversifyConfig/inversifyConfig";

import { AdminController } from "../controllers/adminController";
import verify from "../middlewares/authVerfication";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = express.Router();

const controller = container.get<AdminController>(AdminController);

router.route("/login").post(controller.login);
router.route("/users").get(verify, verifyAdmin, controller.getAllusers);
router.route("/users/:id").get(verify,verifyAdmin, controller.userDetails);
router.route("/users/block/:id").patch(verify,verifyAdmin, controller.blockUser);
router.route("/users/unblock/:id").patch(verify,verifyAdmin, controller.unblockUser);
router.route("/restaurents").get(verify,verifyAdmin, controller.getRestuarentList);
router.route("/verify_restaurent/:id").patch(verify,verifyAdmin,controller.verifyRestaurent);

export default router;
