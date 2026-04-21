const carritocontroller = require('../controllers/controller_carritos');

module.exports = (app) => {
    app.get('/api/carritos/list', carritocontroller.list);
    app.get('/api/carritos/:id_usuario', carritocontroller.find);
    app.post('/api/carritos', carritocontroller.create);
    app.delete('/api/carritos/:id', carritocontroller.delete);
};
