const carritoDetalleController = require('../controllers/controller_carrito_detalle');

module.exports = (app) => {
  app.get('/api/carrito_detalle/list', carritoDetalleController.list);
  app.get('/api/carrito_detalle/:id_carrito', carritoDetalleController.find);
  app.post('/api/carrito_detalle/', carritoDetalleController.create);
  app.put('/api/carrito_detalle/:id', carritoDetalleController.update);
  app.delete('/api/carrito_detalle/:id', carritoDetalleController.delete);
};
