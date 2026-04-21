const productocontroller = require('../controllers/controller_productos');

module.exports = (app) =>{
    app.get('/api/productos/list',productocontroller.list);
    app.get('/api/productos/:nombre',productocontroller.find);
    app.post('/api/productos/',productocontroller.create);
    app.put('/api/productos/:id',productocontroller.update);
    app.delete('/api/productos/:id',productocontroller.delete);
}