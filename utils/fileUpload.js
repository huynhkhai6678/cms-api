import multer from 'multer';
import path from 'path';
import fs from 'fs';
const __dirname = path.resolve();

const createUploadLocation = (params, destinationFolder) => {
    const baseFolder = path.join(__dirname, 'public', 'uploads', destinationFolder);
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(baseFolder)) {
            fs.mkdirSync(baseFolder, { recursive: true }); // recursive = make parent folders too
        }
        cb(null, baseFolder); // Dynamic storage path
      },
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
      }
    });
  
    return multer({ storage }).single(params); // Create upload middleware with dynamic config
}

const getUploadLocation = (params, destinationFolder) => {
    const baseFolder = path.join(__dirname, 'public', 'uploads', destinationFolder);
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(baseFolder)) {
            fs.mkdirSync(baseFolder, { recursive: true }); // recursive = make parent folders too
        }
        cb(null, baseFolder); // Dynamic storage path
      },
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
      }
    });
  
    return multer({ storage }).single(params); // Create upload middleware with dynamic config
}

export default {
    createUploadLocation,
    getUploadLocation
}