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
exports.deleteProductImageById = exports.addProductImages = exports.deleteProductById = exports.updateProductById = exports.insertProduct = exports.getProductImagesByProductId = exports.getProductById = exports.getAllProducts = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const db_1 = __importDefault(require("../config/db"));
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM product_master WHERE is_active = true ORDER BY created_at DESC');
    return result.rows;
});
exports.getAllProducts = getAllProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM product_master WHERE product_id = $1', [id]);
    return result.rows[0];
});
exports.getProductById = getProductById;
const getProductImagesByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM product_images WHERE product_id = $1 ORDER BY sort_order', [productId]);
    return result.rows;
});
exports.getProductImagesByProductId = getProductImagesByProductId;
const insertProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, product_code, category, sub_category, brand, packaging_size, quality, unit_of_measurement, available_quantity, min_order_quantity, price_per_unit, description, created_by, } = productData;
    const normalizedCode = (product_code === null || product_code === void 0 ? void 0 : product_code.trim()) || null;
    if (normalizedCode) {
        const existingProduct = yield db_1.default.query('SELECT product_code FROM product_master WHERE product_code = $1', [normalizedCode]);
        if (existingProduct.rows.length > 0) {
            throw new Error(`Product code '${normalizedCode}' already exists`);
        }
    }
    const result = yield db_1.default.query(`INSERT INTO product_master (
      product_name, product_code, category, sub_category, brand, packaging_size,
      quality, unit_of_measurement, available_quantity, min_order_quantity,
      price_per_unit, description, created_by
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *`, [
        product_name, normalizedCode, category, sub_category, brand, packaging_size,
        quality, unit_of_measurement, available_quantity, min_order_quantity,
        price_per_unit, description, created_by
    ]);
    return result.rows[0];
});
exports.insertProduct = insertProduct;
const updateProductById = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, product_code, category, sub_category, brand, packaging_size, quality, unit_of_measurement, available_quantity, min_order_quantity, price_per_unit, description, updated_by, is_active } = productData;
    const result = yield db_1.default.query(`UPDATE product_master SET
      product_name = $1, product_code = $2, category = $3, sub_category = $4,
      brand = $5, packaging_size = $6, quality = $7, unit_of_measurement = $8,
      available_quantity = $9, min_order_quantity = $10, price_per_unit = $11,
      description = $12, updated_by = $13, updated_at = CURRENT_TIMESTAMP,
      is_active = $14
     WHERE product_id = $15 RETURNING *`, [
        product_name, product_code, category, sub_category, brand, packaging_size,
        quality, unit_of_measurement, available_quantity, min_order_quantity,
        price_per_unit, description, updated_by, is_active, id
    ]);
    return result.rows[0];
});
exports.updateProductById = updateProductById;
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query('DELETE FROM product_master WHERE product_id = $1', [id]);
});
exports.deleteProductById = deleteProductById;
const addProductImages = (images) => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    try {
        for (const img of images) {
            const res = yield db_1.default.query('INSERT INTO product_images (product_id, image_url, is_primary) VALUES ($1, $2, $3) RETURNING *', [img.product_id, img.image_url, img.is_primary]);
            results.push(res.rows[0]);
        }
        return results;
    }
    catch (error) {
        images.forEach(img => {
            const filePath = path_1.default.join(__dirname, '../../uploads', img.image_url.replace('/uploads/', ''));
            fs_1.default.unlink(filePath, (err) => {
                if (err)
                    console.error(`Failed to delete image file: ${filePath}`, err);
            });
        });
        throw error;
    }
});
exports.addProductImages = addProductImages;
const deleteProductImageById = (imageId) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query('DELETE FROM product_images WHERE image_id = $1', [imageId]);
});
exports.deleteProductImageById = deleteProductImageById;
