import mongoose from 'mongoose';

const itemsSchema = new mongoose.Schema({
  libroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro' },
  imagen: String,
  nombre: String,
  precio: Number,
  cantidad: Number,
});

const ordenSchema = new mongoose.Schema({
  userId: String,

  items: [itemsSchema],

  voucher: String,
  nombre: String,
  telefono: String,
  email: String,
  total: Number,
});

export default mongoose.model('Orden', ordenSchema);
