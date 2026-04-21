const usuariocontroller = require('../controllers/controller_usuarios');
const auth = require('../middlewares/auth');

module.exports = (app) => {
  // Rutas públicas
  app.post('/api/usuarios/register', usuariocontroller.create);
  app.post('/api/usuarios/login', usuariocontroller.login);

  // Rutas protegidas (requieren token válido)
  app.get('/api/usuarios/list', auth, usuariocontroller.list);

  // Si tu controlador busca por nombre:
  app.get('/api/usuarios/:nombre', auth, usuariocontroller.find);

  // Si tu controlador busca por id_usuario, cambia la línea anterior por:
  // app.get('/api/usuarios/:id_usuario', auth, usuariocontroller.find);

  app.put('/api/usuarios/:id', auth, usuariocontroller.update);
  app.delete('/api/usuarios/:id', auth, usuariocontroller.delete);
};
