import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import libro from './models/libro.js';
import evento from './models/evento.js';

const app = express();

const corsOptions = {
  origin: process.env.AUTENTICA_URI,
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log('Error de conexión a la base de datos', err));

// LIBROS
app.get('/libros', async (req, res) => {
  const libros = await libro.find();
  res.json(libros);
});

app.post('/libros', async (req, res) => {
  try {
    const nuevoLibro = new libro(req.body);
    await nuevoLibro.save();

    res.status(201).send('Libro guardado');
  } catch (error) {
    res.status(400).send('Error al guardar el libro');

    console.log(error);
  }
});

app.delete('/libros/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const libroEliminado = await libro.findByIdAndDelete(id);

    if (!libroEliminado) {
      return res.status(404).send('Libro no encontrado');
    }

    res.send(`Elemento con id ${id} fue eliminado`);
  } catch (error) {
    res.status(500).send('Error al eliminar');
  }
});

app.patch('/libros/:id', async (req, res) => {
  const id = req.params.id;
  const datosLibros = req.body;

  try {
    const libroActualizado = await libro.findByIdAndUpdate(id, datosLibros, {
      new: true,
    });

    if (!libroActualizado) {
      return res.status(404).send('Libro no encontrado');
    }

    res.json(libroActualizado);
  } catch (error) {
    res.status(500).send('Error al actualizar el libro');
  }
});
// END

// EVENTOS
app.get('/eventos', async (req, res) => {
  const eventos = await evento.find();
  res.json(eventos);
});

app.post('/eventos', async (req, res) => {
  try {
    const nuevoEvento = new evento(req.body);
    await nuevoEvento.save();

    res.status(201).send('Evento agregado');
  } catch (error) {
    console.log(error);

    res.status(400).send('Error al guardar el super evento');
  }
});

app.delete('/eventos/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const eventoEliminado = await evento.findByIdAndDelete(id);

    if (!eventoEliminado) {
      return res.status(404).send('Evento no encontrado');
    }

    res.send(`Elemento con id ${id} fue eliminado`);
  } catch (error) {
    res.status(500).send('Error al eliminar');
  }
});
// END

// SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// END
