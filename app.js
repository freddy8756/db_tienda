require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');

// Inicializar Express
const app = express();

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Rutas de bienvenida
app.get('/', (req, res) => res.status(200).send({
  message: 'Bienvenido a la API de ventas.',
}));

// Rutas personalizadas (ahora sí después de inicializar app)
require('./routes/route_categorias')(app);

// Configurar puerto
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

// Crear servidor
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

module.exports = app;
