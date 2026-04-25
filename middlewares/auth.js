const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, nombre, rol }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function adminMiddleware(req, res, next) {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ message: 'Acceso denegado: solo admin' });
  }
  next();
}

module.exports = { authMiddleware, adminMiddleware };
