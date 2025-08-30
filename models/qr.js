import mongoose from 'mongoose';

const qrSchema = new mongoose.Schema({
  imagen: String,
});

export default mongoose.model('Qr', qrSchema);
