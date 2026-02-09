import { transporter } from '../config/mailer.js';

const sendConfirmationEmail = async ({ to, orderId, total }) => {
  await transporter.sendMail({
    from: `"Mi tienda" <${process.env.GMAIL_USER}>`,
    to,
    subject: 'Confirmación de compra',
    html: `
      <h2>Compra confirmada ✅</h2>
      <p>Orden: <b>#${orderId}</b></p>
      <p>Total: <b>$${total}</b></p>
    `,
  });

  console.log(orderId);
};

export default sendConfirmationEmail;
