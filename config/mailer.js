const sgMail = require("@sendgrid/mail");
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

mail = (to, subject, text) => {
  console.log(to);
  console.log(subject);
  console.log(text);
  const msg = {
    to: to, // Change to your recipient
    from: "esg.feedback1@gmail.com", // Change to your verified sender
    subject: subject,
    text: text,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
      console.error(error.response.body);
    });
};
module.exports = {
    mail
}