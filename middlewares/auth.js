const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Se espera que el cliente mande: Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1]; // quitar "Bearer"
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guardar datos del usuario en la request
    next(); // continuar con la ruta
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
