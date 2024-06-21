const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder;
    if (file.fieldname === 'profilePic') {
      folder = 'profile-pics';
    } else if (file.fieldname === 'coverimg' || file.fieldname === 'images') {
      folder = 'wisata-images';
    }
    return {
      folder: folder,
      format: 'png', // Ensure the format is always png for simplicity
      public_id: file.originalname.split('.')[0].replace(/[^a-zA-Z0-9-_]/g, '_'), // Ensure the public_id is valid
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
