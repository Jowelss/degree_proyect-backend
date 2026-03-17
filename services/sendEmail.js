import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function enviarCorreo(data) {
  const mailOptions = {
    from: 'pastelDepapa.monogluocosis.tuberkulosis.np@gmail.com',
    to: process.env.GMAIL_USER,
    subject: 'NUEVA COMPRA',
    html: `
      <h2>ITEMS</h2>
      ${data.nombre}
    `,
  };

  await transporter.sendMail(mailOptions);
}
