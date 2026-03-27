const categoriascontroller = require('../controllers/controller_categorias');

module.exports = (app) =>{
    app.get('/api/categorias/list',categoriascontroller.list);
    app.get('/api/categorias/:nombre',categoriascontroller.find);
    app.post('/api/categorias/',categoriascontroller.create);
    app.put('/api/categorias/:id',categoriascontroller.update);
    app.delete('/api/categorias/:id',categoriascontroller.delete);
}