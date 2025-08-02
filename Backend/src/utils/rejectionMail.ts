import nodemailer from "nodemailer";

export const sendRejectionMailtoRider = async (
  email: string,
  reason: string
) => {
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
      subject: "Application Rejected",
      text: `Your application to Eliteeats has been rejected.\n\nReason: ${reason}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);
    return true;
  } catch (error) {
    console.log(error);
  }
};
