import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  nombre: String, // Nombre
  autor: String, // Autor/a
  genero: String, // Género
  imagen: String, // Imagen
  sinopsis: String, // ¿De que trata?
  precio: Number, // Inversion
  estado: String, // Disponibles - Agotado
  tapa: String, // ¿Como es este ejemplar?
  hoja: String, // ¿Como es este ejemplar?
});

export default mongoose.model('Libro', libroSchema);
