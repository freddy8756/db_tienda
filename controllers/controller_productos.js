const db = require('../models');
const Producto = db.tbb_productos;


module.exports = {
async create(req, res) {
  try {
    const producto = await Producto.create({
      id_categoria: req.body.id_categoria,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock
    });
    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}
,
    async list(_, res) {
        try {
            const productos = await Producto.findAll();
            res.status(200).json(productos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async find(req, res) {
        try {
            const productos = await Producto.findAll({
                where: { nombre: req.params.nombre }
            });
            res.status(200).json(productos);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await Producto.destroy({ where: { id: req.params.id } });
            res.status(200).json({ message: "Producto eliminado correctamente" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            await Producto.update(
                { nombre: req.body.nombre },
                { where: { id: req.params.id } }
            );
            res.status(200).json({ message: "Producto actualizado correctamente" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
