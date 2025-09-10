import mongoose from 'mongoose';

const itemsSchema = new mongoose.Schema({
  libroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro' },
  nombre: String,
  precio: Number,
  cantidad: Number,
});

const ordenSchema = new mongoose.Schema({
  userId: String,

  items: [itemsSchema],

  voucher: String,
  total: Number,
});

export default mongoose.model('Orden', ordenSchema);
