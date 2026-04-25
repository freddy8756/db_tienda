const usuariosController = require("../controllers/controller_usuarios");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth");

module.exports = (app) => {
  app.post("/api/usuarios/register", usuariosController.create);
  app.post("/api/usuarios/login", usuariosController.login);

  app.get("/api/usuarios/list", authMiddleware, adminMiddleware, usuariosController.list);
  app.get("/api/usuarios/:id", authMiddleware, usuariosController.find);
  app.put("/api/usuarios/:id", authMiddleware, adminMiddleware, usuariosController.update);
  app.delete("/api/usuarios/:id", authMiddleware, adminMiddleware, usuariosController.delete);
};
