import express from "express";
import adminContainer from "../config/inversifyAdmin";

import { AdminController } from "../controllers/adminController";

const router = express.Router();

const controller = adminContainer.get<AdminController>(AdminController);

router.route("/login").post(controller.login);
router.route("/users").get(controller.getAllusers);
router.route("/users/:id").get(controller.userDetails)
router.route("/users/block/:id").patch(controller.blockUser);
router.route("/users/unblock/:id").patch(controller.unblockUser);

export default router;
