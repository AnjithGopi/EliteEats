import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password:string) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
};

export default hashPassword;
