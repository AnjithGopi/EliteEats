import express from "express"
import adminController from "../controllers/adminController.ts"

const router=express.Router()


router.route("/login").post(adminController.login)
router.route("/users").get(adminController.getAllusers)
router.route("/users/:id")
.get(adminController.userDetails)
.patch(adminController.blockUser)

 



export default router