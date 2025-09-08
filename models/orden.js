import mongoose from 'mongoose';

const ordenSchema = new mongoose.Schema({
  userId: String,

  items: [
    {
      libroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Libro' },
      nombre: String,
      precio: Number,
      cantidad: Number,
    },
  ],

  total: Number,
});

export default mongoose.model('Orden', ordenSchema);
