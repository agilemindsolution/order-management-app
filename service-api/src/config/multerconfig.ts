// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';

// const IMAGE_UPLOAD_DIR = './uploads/products';

// // Ensure the upload directory exists
// if (!fs.existsSync(IMAGE_UPLOAD_DIR)) {
//     fs.mkdirSync(IMAGE_UPLOAD_DIR, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, IMAGE_UPLOAD_DIR);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = uuidv4();
//     const ext = path.extname(file.originalname);
//     const filename = `${uniqueSuffix}${ext}`;
//     cb(null, filename);
//   },
// });

// // const fileFilter = (req, file, cb) => {
// //   const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
// //   if (allowedTypes.includes(file.mimetype)) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error('Invalid file type. Only JPEG, PNG, JPG, and WEBP are allowed.'));
// //   }
// // };

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|webp/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);
//     if (extname && mimetype) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only images are allowed'));
//     }
// };

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }
// });


// ts file:
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const IMAGE_UPLOAD_DIR = './uploads/products';

// Ensure the upload directory exists
if (!fs.existsSync(IMAGE_UPLOAD_DIR)) {
  fs.mkdirSync(IMAGE_UPLOAD_DIR, { recursive: true });
}

// Define storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = uuidv4();
    const ext = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${ext}`;
    cb(null, filename);
  },
});

// File filter to only allow specific image formats
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
      // Reject the file with a MulterError
      cb(new Error('Only images are allowed'), false); // Reject the file
  }
};

// Set up multer options with limits and filters
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

export default fileFilter;