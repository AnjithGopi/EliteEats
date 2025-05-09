import { IPasswordResetRepository } from "../domain/interface/IPasswordResetRepository";
import Token from "../models/passwordResetModel";



export class PasswordResetRepository implements IPasswordResetRepository {
  constructor() {}

  saveToken = async (user:any) => {
    return await Token.create(user);
  };

  checkuser=async(token:string)=>{

    return await Token.find({token:token})
  }
}


