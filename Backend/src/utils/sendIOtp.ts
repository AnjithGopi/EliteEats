
import nodemailer from "nodemailer"


const sendOtp=async(email:string,otp:string)=>{


    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("Email credentials not configured in environment variables");
    }

    if (!email || !otp) {
        throw new Error("Email and OTP are required");
    }

    try {
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
            subject: "Verify Your Email",
            text: `Your OTP is: ${otp}`,
           
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error(`Failed to send email: ${error}`);
    }
}



export default sendOtp