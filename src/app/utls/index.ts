import { Resend } from "resend";

const resend = new Resend(process.env.API_KEY as string); // Ensure it's treated as a string

type Email = {
    to: string;
    subject: string;
    desc: string;
    attachment?: Buffer;
};

export async function sendEmail({ to,subject, desc,attachment }: Email) {
    // const email = process.env.EMAIL_RECEVIER; // Correct the variable name if necessary

    if ( !process.env.EMAIL_USER) {
        throw new Error('Email receiver or user not defined in environment variables.');
    }

    const messageData = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        html: desc,
        attachments: [
    {
      filename: "qrcode.png",
      content: attachment?.toString("base64"),
      type: "image/png",
      disposition: "attachment", // Use "inline" to try to embed
    }
  ],
    };

    try {
        const response = await resend.emails.send(messageData);
        console.log("Email sent successfully:", response);
    } catch (error) {
        console.log("🚀 ~ exports.sendEmail= ~ error:", error);
        throw new Error('Failed to send email');
    }
}
