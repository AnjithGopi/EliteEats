import type { Request, Response } from "express";
import UserService from "../services/userService.ts";

class userController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  userSignup = async (req: Request, res: Response) => {
    try {
      let data = await this.userService.register(req.body);

      if (data) {
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const data = await this.userService.findUser(req.body);
      const user = await this.userService.verifyUser(data);
      res.status(201).json({ messsage: "User Registered Successfully", user });
    } catch (error) {
      console.log(error);
    }
  };
}

export default new userController();
