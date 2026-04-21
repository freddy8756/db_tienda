const { tbc_categorias } = require('../models');

module.exports = {
    async create(req, res) {
        try {
            const categoria = await tbc_categorias.create({
                nombre: req.body.nombre
            });
            res.status(201).json(categoria);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async list(_, res) {
        try {
            const categorias = await tbc_categorias.findAll();
            res.status(200).json(categorias);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async find(req, res) {
        try {
            const categorias = await tbc_categorias.findAll({
                where: { nombre: req.params.nombre }
            });
            res.status(200).json(categorias);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await tbc_categorias.destroy({ where: { id: req.params.id } });
            res.status(200).json({ message: "Categoria eliminada correctamente" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            await tbc_categorias.update(
                { nombre: req.body.nombre },
                { where: { id: req.params.id } }
            );
            res.status(200).json({ message: "Categoria actualizada correctamente" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
