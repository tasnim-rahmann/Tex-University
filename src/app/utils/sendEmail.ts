import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async () => {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === 'production', // true for 465, false for other ports
        auth: {
            user: "tasnimrahman0202@gmail.com",
            pass: "cgdi ovin ufyo dgbe",
        },
    });

    await transporter.sendMail({
        from: 'tasnimrahman0202@gmail.com',
        to: "tasnimrahman0101@gmail.com",
        subject: "Action Required: Please Change Your Password",

        text: `Dear User,
        Your account is currently using a default password. For your security, please update your password as soon as possible.
        You can change your password by logging into your account and navigating to the "Change Password" section.
        If you did not request this or need any assistance, please contact our support team immediately.
        Thank you for your prompt attention.

        Best regards,
        Go To Hell Support Team
        `,

        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <p>Dear User,</p>
          <p>Your account is currently using a <strong>default password</strong>. For your security, please update your password as soon as possible.</p>
          <p>You can change your password by logging into your account and navigating to the <em>Change Password</em> section.</p>
          <p>If you did not request this or need any assistance, please contact our support team immediately.</p>
          <p>Thank you for your prompt attention.</p>
          <p>Best regards,<br><strong>Go To Hell</strong> Support Team</p>
        </div>
        `

    });
};