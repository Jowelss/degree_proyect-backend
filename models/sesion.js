import mongoose from 'mongoose';

const sesionSchema = new mongoose.Schema({
  titulo: String,
  link: String,
  fecha: Date,
  hora: String,
  descripcion: String,
  imagen: String,
});

export default mongoose.model('Sesion', sesionSchema);
