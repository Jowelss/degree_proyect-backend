import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  nombre: String,
  imagen: String,
  descripcion: String,
  fecha: Date,
  ubicacion: String,
  hora: String,
  cupos: Number,
});

export default mongoose.model('Evento', eventoSchema);
