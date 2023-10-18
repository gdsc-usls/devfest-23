import nodemailer from "nodemailer";

type Payload = {
  to: string;
  subject: string;
  html: string;
};

export const handleSendEmail = async (data: Payload) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  return (
    transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      ...data,
    }),
    function (error: string, _info: string) {
      if (error) {
        throw new Error(error);
      } else {
        console.log("Email Sent");
        return true;
      }
    }
  );
};
