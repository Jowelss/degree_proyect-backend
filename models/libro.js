import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  nombre: String, // Nombre
  autor: String, // Autor/a
  genero: String, // Género
  imagen: {
    type: String,
    required: true,
  },
  sinopsis: String, // ¿De que trata?
  precio: Number, // Inversion
  estado: String, // Disponibles - Agotado
  formato: String, // ¿Como es este ejemplar?
});

export default mongoose.model('Libro', libroSchema);
