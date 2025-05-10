"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const IMAGE_UPLOAD_DIR = './uploads/products';
if (!fs_1.default.existsSync(IMAGE_UPLOAD_DIR)) {
    fs_1.default.mkdirSync(IMAGE_UPLOAD_DIR, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, IMAGE_UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = (0, uuid_1.v4)();
        const ext = path_1.default.extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        cb(null, filename);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    }
    else {
        cb(new Error('Only images are allowed'), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
});
exports.default = fileFilter;
