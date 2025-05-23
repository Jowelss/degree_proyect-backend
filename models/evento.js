import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  nombre: String,
  imagen: {
    type: String,
    required: true,
  },
  descripcion: String,
  fecha: Date,
  ubicacion: String,
  hora: String,
});

export default mongoose.model('Evento', eventoSchema);
