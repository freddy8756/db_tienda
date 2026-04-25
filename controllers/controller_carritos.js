const db = require('../models');
const Carritos = db.tbb_carritos;

module.exports = {
  async create(req, res) {
    try {
      const carrito = await Carritos.create({
        id_usuario: req.user.id, // se toma del token
        fecha_creacion: new Date()
      });
      res.status(201).json(carrito);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado' });
      }
      const carritos = await Carritos.findAll();
      res.status(200).json(carritos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async find(req, res) {
    try {
      if (req.user.rol === 'cliente' && req.user.id !== Number(req.params.id_usuario)) {
        return res.status(403).json({ error: 'No puedes ver carritos de otros usuarios' });
      }
      const carritos = await Carritos.findAll({ where: { id_usuario: req.params.id_usuario } });
      res.status(200).json(carritos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado' });
      }
      await Carritos.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Carrito eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
