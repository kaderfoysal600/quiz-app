const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    //to send email ->  firstly create a Transporter
    let transporter = nodemailer.createTransport({
      service: "gmail", //-> Host SMTP detail
      auth: {
        user: "kaderf113@gmail.com", //-> User's mail for authentication
        pass: "xkpavtuklviwmaev", //-> User's password for authentication
      },
    });

    //now Send e-mails to users
    let info = await transporter.sendMail({
      from: "www.sandeepdev.me - Sandeep Singh",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log("Info is here: ", info);
    return info;
  } catch (error) {
    console.log("error.message101", error.message);
  }
};

module.exports = mailSender;
