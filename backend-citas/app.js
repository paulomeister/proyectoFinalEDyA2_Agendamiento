const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const mongoURI = 'mongodb://127.0.0.1:27017/citas';

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión a MongoDB:', err));


app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
