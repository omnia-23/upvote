import nodemailer from "nodemailer";

export const sendMail = async (email, token) => {
  const html = `<a href="http://localhost:3000/auth/confirm?token=${token}"> confirm email </a>`;
  const mail = await transporter.sendMail({
    from: "Route <omnia.route@gmail.com>",
    to: email,
    subject: "Hello",
    html: html,
  });
  console.log(mail);
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "omnia.route@gmail.com",
    pass: "lenx caed efxg hhtq",
  },
});
