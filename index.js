import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import libro from './models/libro.js';
import evento from './models/evento.js';
import post from './models/post.js';
import qr from './models/qr.js';
import orden from './models/orden.js';

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

const crearRutasCrud = (app, modelo, rutaBase) => {
  app.get(rutaBase, async (req, res) => {
    const elemento = await modelo.find();
    res.json(elemento);
  });

  app.post(rutaBase, async (req, res) => {
    try {
      const nuevoElemento = new modelo(req.body);
      await nuevoElemento.save();

      res.status(201).send('Elemento guardado');
    } catch (error) {
      res.status(400).send('Error al guardar el elemento');

      console.log(error);
    }
  });

  app.delete(`${rutaBase}/:id`, async (req, res) => {
    const id = req.params.id;

    try {
      const elementoEliminado = await modelo.findByIdAndDelete(id);

      if (!elementoEliminado) {
        return res.status(404).send('Elemento no encontrado');
      }

      res.send(`Elemento con id ${id} fue eliminado`);
    } catch (error) {
      res.status(500).send('Error al eliminar');
    }
  });

  app.patch(`${rutaBase}/:id`, async (req, res) => {
    const id = req.params.id;
    const elemento = req.body;

    try {
      const elementoActualizado = await modelo.findByIdAndUpdate(id, elemento, {
        new: true,
      });

      if (!elementoActualizado) {
        return res.status(404).send('Elemento no encontrado');
      }

      res.json(elementoActualizado);
    } catch (error) {
      res.status(500).send('Error al actualizar el elemento');
    }
  });
};

crearRutasCrud(app, libro, '/libros');
crearRutasCrud(app, evento, '/eventos');
crearRutasCrud(app, post, '/posts');
crearRutasCrud(app, qr, '/qr');
crearRutasCrud(app, orden, '/orden');

// SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// END
