import crypto from "crypto";

const redisVerificationToken = () => {
  return crypto.randomBytes(16).toString("hex"); //Converts the bytes into a hexadecimal string, which gives you a 32-character string
};

export default redisVerificationToken;
