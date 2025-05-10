"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductImage = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getSpecificProduct = exports.getProducts = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const http_errors_1 = __importDefault(require("http-errors"));
const productModel_1 = require("../models/productModel");
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productModel_1.getAllProducts)();
        res.json(products);
    }
    catch (err) {
        next(err);
    }
});
exports.getProducts = getProducts;
const getSpecificProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, productModel_1.getProductById)(req.params.id);
        const images = yield (0, productModel_1.getProductImagesByProductId)(req.params.id);
        res.json(Object.assign(Object.assign({}, product), { images }));
    }
    catch (err) {
        next(err);
    }
});
exports.getSpecificProduct = getSpecificProduct;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, productModel_1.insertProduct)(req.body);
        const images = req.files.map((file, idx) => {
            const isPrimary = Array.isArray(req.body.is_primary)
                ? req.body.is_primary[idx] === 'true'
                : req.body.is_primary === 'true';
            return {
                product_id: product.product_id,
                image_url: `/uploads/products/${file.filename}`,
                is_primary: isPrimary
            };
        });
        if (images.length > 0) {
            try {
                yield (0, productModel_1.addProductImages)(images);
            }
            catch (dbError) {
                images.forEach((img) => {
                    const filePath = path_1.default.join(__dirname, '../../uploads', img.image_url.replace('/uploads/', ''));
                    fs_1.default.unlink(filePath, (err) => {
                        if (err)
                            console.error(`Failed to delete image file: ${filePath}`, err);
                    });
                });
                throw dbError;
            }
        }
        res.status(201).json(Object.assign(Object.assign({}, product), { images }));
    }
    catch (err) {
        console.error("Error in createProduct:", err);
        if (err.code === 'LIMIT_FILE_SIZE') {
            return next((0, http_errors_1.default)(413, 'File size is too large. Max 2MB allowed.'));
        }
        if (err.code === '23505') {
            const message = err.detail.includes("product_code")
                ? 'A product with this code already exists.'
                : 'A unique constraint violation occurred.';
            return next((0, http_errors_1.default)(409, message));
        }
        return next((0, http_errors_1.default)(500, 'An unexpected error occurred while creating the product.'));
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const product = yield (0, productModel_1.updateProductById)(req.params.id, req.body);
        if ((_a = req.body.images) === null || _a === void 0 ? void 0 : _a.length) {
            yield (0, productModel_1.addProductImages)(req.body.images);
        }
        res.json(product);
    }
    catch (err) {
        next(err);
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, productModel_1.deleteProductById)(req.params.id);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProduct = deleteProduct;
const deleteProductImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, productModel_1.deleteProductImageById)(req.params.imageId);
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProductImage = deleteProductImage;
