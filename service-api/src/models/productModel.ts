// import db from '../config/db.js';

// const getAllProducts = async () => {
//   const result = await db.query('SELECT * FROM product_master WHERE is_active = true ORDER BY created_at DESC');
//   return result.rows;
// };

// const getProductById = async (id) => {
//   const result = await db.query('SELECT * FROM product_master WHERE product_id = $1', [id]);
//   return result.rows[0];
// };

// const getProductImagesByProductId = async (productId) => {
//   const result = await db.query('SELECT * FROM product_images WHERE product_id = $1 ORDER BY sort_order', [productId]);
//   return result.rows;
// };

// const insertProduct = async (productData) => {
//   const {
//     product_name, product_code, category, sub_category, brand, packaging_size,
//     quality, unit_of_measurement, available_quantity, min_order_quantity,
//     price_per_unit, description, created_by
//   } = productData;

//   const normalizedCode = product_code?.trim() || null;

//   if (normalizedCode) {
//     const existingProduct = await db.query(
//       `SELECT product_code FROM product_master WHERE product_code = $1`,
//       [normalizedCode]
//     );
    
//     if (existingProduct.rows.length > 0) {
//       throw new Error(`Product code '${normalizedCode}' already exists`);
//     }
//   }
  
//   const result = await db.query(
//     `INSERT INTO product_master (
//       product_name, product_code, category, sub_category, brand, packaging_size,
//       quality, unit_of_measurement, available_quantity, min_order_quantity,
//       price_per_unit, description, created_by
//     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
//     RETURNING *`,
//     [
//       product_name, normalizedCode, category, sub_category, brand, packaging_size,
//       quality, unit_of_measurement, available_quantity, min_order_quantity,
//       price_per_unit, description, created_by
//     ]
//   );
//   return result.rows[0];
// };

// const updateProductById = async (id, productData) => {
//   const {
//     product_name, product_code, category, sub_category, brand, packaging_size,
//     quality, unit_of_measurement, available_quantity, min_order_quantity,
//     price_per_unit, description, updated_by, is_active
//   } = productData;

//   const result = await db.query(
//     `UPDATE product_master SET
//       product_name = $1, product_code = $2, category = $3, sub_category = $4,
//       brand = $5, packaging_size = $6, quality = $7, unit_of_measurement = $8,
//       available_quantity = $9, min_order_quantity = $10, price_per_unit = $11,
//       description = $12, updated_by = $13, updated_at = CURRENT_TIMESTAMP,
//       is_active = $14
//      WHERE product_id = $15 RETURNING *`,
//     [
//       product_name, product_code, category, sub_category, brand, packaging_size,
//       quality, unit_of_measurement, available_quantity, min_order_quantity,
//       price_per_unit, description, updated_by, is_active, id
//     ]
//   );
//   return result.rows[0];
// };

// const deleteProductById = async (id) => {
//   await db.query('DELETE FROM product_master WHERE product_id = $1', [id]);
// };

// const addProductImages = async (images) => {  
//   const values = images.map(img => [img.product_id, img.image_url, img.is_primary]);
//   try {
//     const query = `INSERT INTO product_images (product_id, image_url, is_primary) VALUES ($1, $2, $3) RETURNING *`;

//     const results = [];
//     for (const img of values) {
//       const res = await db.query(query, img);
//       results.push(res.rows[0]);
//     }

//     return results;
//   } catch (error) {
//     // Rollback the uploaded files if the database insert fails
//     images.forEach(img => {
//       const filePath = path.join(__dirname, '../../uploads', img.image_url.replace('/uploads/', ''));
//       fs.unlink(filePath, (err) => {
//         if (err) console.error(`Failed to delete image file: ${filePath}`, err);
//       });
//     });
//     throw error;  // Re-throw the error to be caught in the controller
//   } 
// };

// const deleteProductImageById = async (imageId) => {
//   await db.query('DELETE FROM product_images WHERE image_id = $1', [imageId]);
// };

// export {
//   getAllProducts,
//   getProductById,
//   getProductImagesByProductId,
//   insertProduct,
//   updateProductById,
//   deleteProductById,
//   addProductImages,
//   deleteProductImageById
// };


import path from 'path';
import fs from 'fs';
import pool from '../config/db';

// Define the types for Product and ProductImage
export interface Product {
  product_id: number;
  product_name: string;
  product_code: string;
  category: string;
  sub_category: string;
  brand: string;
  packaging_size: string;
  quality: string;
  unit_of_measurement: string;
  available_quantity: number;
  min_order_quantity: number;
  price_per_unit: number;
  description: string;
  created_by: string;
  updated_by?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ProductImage {
  image_id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  created_at: Date;
  updated_at: Date;
}

// Fetch all active products
export const getAllProducts = async (): Promise<Product[]> => {
  const result = await pool.query(
    'SELECT * FROM product_master WHERE is_active = true ORDER BY created_at DESC'
  );
  return result.rows;
};

// Fetch a product by ID
export const getProductById = async (id: any): Promise<Product | undefined> => {
  const result = await pool.query('SELECT * FROM product_master WHERE product_id = $1', [id]);
  return result.rows[0];
};

// Fetch all images for a given product
export const getProductImagesByProductId = async (productId: any): Promise<ProductImage[]> => {
  const result = await pool.query(
    'SELECT * FROM product_images WHERE product_id = $1 ORDER BY sort_order',
    [productId]
  );
  return result.rows;
};

// Insert a new product
export const insertProduct = async (productData: Partial<Product>): Promise<Product> => {
  const {
    product_name,
    product_code,
    category,
    sub_category,
    brand,
    packaging_size,
    quality,
    unit_of_measurement,
    available_quantity,
    min_order_quantity,
    price_per_unit,
    description,
    created_by,
  } = productData;

  const normalizedCode = product_code?.trim() || null;

  if (normalizedCode) {
    const existingProduct = await pool.query(
      'SELECT product_code FROM product_master WHERE product_code = $1',
      [normalizedCode]
    );
    
    if (existingProduct.rows.length > 0) {
      throw new Error(`Product code '${normalizedCode}' already exists`);
    }
  }

  const result = await pool.query(
    `INSERT INTO product_master (
      product_name, product_code, category, sub_category, brand, packaging_size,
      quality, unit_of_measurement, available_quantity, min_order_quantity,
      price_per_unit, description, created_by
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *`,
    [
      product_name, normalizedCode, category, sub_category, brand, packaging_size,
      quality, unit_of_measurement, available_quantity, min_order_quantity,
      price_per_unit, description, created_by
    ]
  );
  return result.rows[0];
};

// Update a product by ID
export const updateProductById = async (id: any, productData: Partial<Product>): Promise<Product> => {
  const {
    product_name,
    product_code,
    category,
    sub_category,
    brand,
    packaging_size,
    quality,
    unit_of_measurement,
    available_quantity,
    min_order_quantity,
    price_per_unit,
    description,
    updated_by,
    is_active
  } = productData;

  const result = await pool.query(
    `UPDATE product_master SET
      product_name = $1, product_code = $2, category = $3, sub_category = $4,
      brand = $5, packaging_size = $6, quality = $7, unit_of_measurement = $8,
      available_quantity = $9, min_order_quantity = $10, price_per_unit = $11,
      description = $12, updated_by = $13, updated_at = CURRENT_TIMESTAMP,
      is_active = $14
     WHERE product_id = $15 RETURNING *`,
    [
      product_name, product_code, category, sub_category, brand, packaging_size,
      quality, unit_of_measurement, available_quantity, min_order_quantity,
      price_per_unit, description, updated_by, is_active, id
    ]
  );
  return result.rows[0];
};

// Delete a product by ID
export const deleteProductById = async (id: any): Promise<void> => {
  await pool.query('DELETE FROM product_master WHERE product_id = $1', [id]);
};

// Add multiple product images
export const addProductImages = async (images: { product_id: number; image_url: string; is_primary: boolean }[]): Promise<ProductImage[]> => {
  const results: ProductImage[] = [];
  
  try {
    for (const img of images) {
      const res = await pool.query(
        'INSERT INTO product_images (product_id, image_url, is_primary) VALUES ($1, $2, $3) RETURNING *',
        [img.product_id, img.image_url, img.is_primary]
      );
      results.push(res.rows[0]);
    }

    return results;
  } catch (error) {
    // Rollback the uploaded files if the database insert fails
    images.forEach(img => {
      const filePath = path.join(__dirname, '../../uploads', img.image_url.replace('/uploads/', ''));
      fs.unlink(filePath, (err) => {
        if (err) console.error(`Failed to delete image file: ${filePath}`, err);
      });
    });
    throw error;
  }
};

// Delete a product image by ID
export const deleteProductImageById = async (imageId: any): Promise<void> => {
  await pool.query('DELETE FROM product_images WHERE image_id = $1', [imageId]);
};
