const db = require('../models');
const Usuario = db.tbc_usuarios;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  async create(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const usuario = await Usuario.create({
        ...req.body,
        password: hashedPassword
      });

      const token = jwt.sign(
        { id: usuario.id, nombre: usuario.nombre },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(201).json({ usuario, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { nombre, password } = req.body;
      const usuario = await Usuario.findOne({ where: { nombre } });

      if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

      const validPassword = await bcrypt.compare(password, usuario.password);
      if (!validPassword) return res.status(401).json({ message: 'Credenciales inválidas' });

      const token = jwt.sign(
        { id: usuario.id, nombre: usuario.nombre },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async list(_, res) {
    try {
      const usuarios = await Usuario.findAll({ attributes: { exclude: ["password"] } });
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async find(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        where: { nombre: req.params.nombre },
        attributes: { exclude: ["password"] }
      });
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Usuario.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      await Usuario.update(req.body, { where: { id: req.params.id } });
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
