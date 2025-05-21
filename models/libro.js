import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  nombre: String,
  autor: String,
  genero: String,
  imagen: {
    type: String,
    required: true,
  },
  sinopsis: String,
  precio: Number,
  cantidad: Number,
  estado: String,
});

export default mongoose.model('Libro', libroSchema);
