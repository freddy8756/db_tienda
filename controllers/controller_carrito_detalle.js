const db = require('../models');
const CarritoDetalle = db.tbc_carrito_detalle;

module.exports = {
  async create(req, res) {
    try {
      const nuevoDetalle = await CarritoDetalle.create({
        id_carrito: req.body.id_carrito,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad || 1,
        precio_unitario: req.body.precio_unitario
      });
      res.status(201).json(nuevoDetalle);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },

  async list(req, res) {
  try {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'Acceso denegado' });
    }
    const detalles = await CarritoDetalle.findAll();
    res.status(200).json(detalles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
},

async find(req, res) {
  try {
    if (req.user.rol === 'cliente' && req.user.id !== Number(req.params.id_carrito)) {
      return res.status(403).json({ error: 'No puedes ver carritos de otros usuarios' });
    }
    const detalles = await CarritoDetalle.findAll({ where: { id_carrito: req.params.id_carrito } });
    res.status(200).json(detalles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
},


  async delete(req, res) {
    try {
      await CarritoDetalle.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Carrito eliminado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      await CarritoDetalle.update(
        { cantidad: req.body.cantidad },
        { where: { id: req.params.id } }
      );
      res.status(200).json({ message: "Carrito actualizado correctamente" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
