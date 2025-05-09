import crypto from "crypto";

export const passwordResetToken = () => {
  return crypto.randomBytes(16).toString("hex");
};


