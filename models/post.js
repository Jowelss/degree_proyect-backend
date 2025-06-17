import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  titulo: String,
  imagen: String,
  mensaje: String,
  tipo: String,
});

export default mongoose.model('Post', postSchema);
