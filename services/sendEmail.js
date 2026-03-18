import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function enviarCorreo(data) {
  const itemsHTML = data.items

    .map(
      (item) => `
    <tr>
      <td style="padding:8px; border:1px solid #ddd;">${item.nombre}</td>
      <td style="padding:8px; border:1px solid #ddd; text-align:center;">${item.cantidad}</td>
      <td style="padding:8px; border:1px solid #ddd; text-align:right;">${item.precio}</td>
       <td style="padding:8px; border:1px solid #ddd; text-align:right;">
        $${item.precio * item.cantidad}
      </td>
    </tr>
  `,
    )
    .join('');

  const mailOptions = {
    from: 'syufdskjfdksl@gmail.com',
    to: process.env.GMAIL_USER,
    subject: '🛒 Nueva compra realizada',
    html: `
  <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; padding:20px;">

    <h2 style="text-align:center; color:#333;">Nueva Compra</h2>

    <p><strong>Cliente:</strong> ${data.nombre}</p>

    <h3 style="margin-top:20px;">📚 Detalle de la compra</h3>

    <table style="width:100%; border-collapse:collapse; margin-top:10px;">
      <thead>
        <tr style="background-color:#f5f5f5;">
          <th style="padding:10px; border:1px solid #ddd;">Libro</th>
          <th style="padding:10px; border:1px solid #ddd;">Cantidad</th>
          <th style="padding:10px; border:1px solid #ddd;">Precio (bs)</th>
          <th style="padding:10px; border:1px solid #ddd;">Subtotal</th>
        </tr>
      </thead>

      <tbody>
        ${itemsHTML}
      </tbody>
    </table>

    <h3 style="text-align:right; margin-top:20px;">
      Total: Bs${data.total}
    </h3>

    <div style="margin-top:30px; padding:15px; border:1px dashed #aaa;">
      <p><strong>Voucher:</strong></p>
      <div style"width:150px">
        <img style="width:100%" src="${data.voucher}" alt="Comprobante">
      </div>
      </div>

    <p style="margin-top:30px; font-size:12px; color:#777; text-align:center;">
      Este es un correo automático generado por el sistema.
    </p>

  </div>
  `,
  };

  await transporter.sendMail(mailOptions);
}
