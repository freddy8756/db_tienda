const db = require('../models');
const Carritos = db.tbb_carritos;

module.exports = {
  async create(req, res) {
    try {
      const carrito = await Carritos.create({
        id_usuario: req.body.id_usuario,
        fecha_creacion: req.body.fecha_creacion,
      });
      res.status(201).json(carrito);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },

  async list(_, res) {
    try {
      const carritos = await Carritos.findAll();
      res.status(200).json(carritos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async find(req, res) {
    try {
      const carritos = await Carritos.findAll({
        where: { id_usuario: req.params.id_usuario }
      });
      res.status(200).json(carritos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Carritos.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Carrito eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
