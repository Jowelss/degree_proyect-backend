import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  imagen: String,
});

export default mongoose.model('QR', eventoSchema);
