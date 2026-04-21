require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors'); // <-- importar cors

// Inicializar Express
const app = express();

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// habilitar CORS para tu frontend
app.use(cors({
  origin: "http://localhost:5173" // el puerto donde corre Vite
}));

// Rutas de bienvenida
app.get('/', (req, res) => res.status(200).send({
  message: 'Bienvenido a la API de ventas.',
}));

// Rutas personalizadas
require('./routes/route_categorias')(app);
require('./routes/route_productos')(app);
require('./routes/route_carritos')(app);
require('./routes/route_carrito_detalle')(app);
require('./routes/route_usuarios')(app);

// Configurar puerto
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

// Crear servidor
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

module.exports = app;
