import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function enviarCorreo(cliente, compra, email) {
  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: 'Nueva compra',
    text: `El cliente ${cliente} realizó una compra: ${compra}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = enviarCorreo;
