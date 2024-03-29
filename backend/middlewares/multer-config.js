const multer = require('multer');

// Dictionnaire pour définir les extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Objet de configuration pour multer
const storage = multer.diskStorage({
  // Paramètrage de la destination
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // Paramètrage du nom du fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage }).single('image');