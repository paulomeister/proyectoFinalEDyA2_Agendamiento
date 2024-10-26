const admin = require('../FirebaseConfig/firebaseConfig');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 
  
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token no válido', error });
  }
};

module.exports = verifyToken;
