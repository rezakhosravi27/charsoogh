const mailer = require("nodemailer");

const sendMail = async (option) => {
  const transporter = mailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Fred Foo 👻" <reza.khosravi245996@gmail.com>', // sender address
    to: option.email, // list of receivers
    subject: option.subject, // Subject line
    text: option.text,
    html: option.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
