import nodemailer from "nodemailer";

export const sendVerificationMail = async (email: string) => {
  try {
    console.log(email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Restaurent is verified",
      text: `Your profile is verifed successfully`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);
    return true;
  } catch (error) {
    console.log(error);
  }
};
