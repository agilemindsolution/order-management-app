// import {
//   getAllProducts,
//   getProductById,
//   getProductImagesByProductId,
//   insertProduct,
//   updateProductById,
//   deleteProductById,
//   addProductImages,
//   deleteProductImageById,
// } from '../models/productModel.js';

// const getProducts = async (req, res, next) => {
//   try {
//     const products = await getAllProducts();
//     res.json(products);
//   } catch (err) {
//     next(err);
//   }
// };

// const getSpecificProduct = async (req, res, next) => {
//   try {
//     const product = await getProductById(req.params.id);
//     const images = await getProductImagesByProductId(req.params.id);
//     res.json({ ...product, images });
//   } catch (err) {
//     next(err);
//   }
// };

// const createProduct = async (req, res, next) => {
//   try {
//     const product = await insertProduct(req.body);

//     const images = req.files.map((file, idx) => {
//       const isPrimary = Array.isArray(req.body.is_primary)
//         ? req.body.is_primary[idx] === 'true'
//         : req.body.is_primary === 'true';  // For single image upload
//       return {
//         product_id: product.product_id,
//         image_url: `/uploads/products/${file.filename}`,
//         is_primary: isPrimary
//       };
//     });   
     
//     if (images.length > 0) {
//       try {
//         await addProductImages(images);
//       } catch (dbError) {
//         // Delete all uploaded files if image insertion fails
//         images.forEach(img => {
//           const filePath = path.join(__dirname, '../../uploads', img.image_url.replace('/uploads/', ''));
//           fs.unlink(filePath, (err) => {
//             if (err) console.error(`Failed to delete image file: ${filePath}`, err);
//           });
//         });
//         throw dbError;
//       }
//       // await addProductImages(images);
//     }
//     res.status(201).json({ ...product, images });
//   } catch (err) {
//     console.error("Error in createProduct:", err);

//     // Handle Multer file size errors
//     if (err.code === 'LIMIT_FILE_SIZE') {
//       return next(createError(413, 'File size is too large. Max 2MB allowed.'));
//     }

//     // Handle unique constraint errors (e.g., duplicate product code)
//     if (err.code === '23505') {
//       const message = err.detail.includes("product_code") 
//         ? 'A product with this code already exists.' 
//         : 'A unique constraint violation occurred.';
//       return next(createError(409, message));
//     }

//     // General server error
//     return next(createError(500, 'An unexpected error occurred while creating the product.'));
//   }
// };

// const updateProduct = async (req, res, next) => {
//   try {
//     const product = await updateProductById(req.params.id, req.body);
//     if (req.body.images?.length) {
//       await addProductImages(product.product_id, req.body.images);
//     }
//     res.json(product);
//   } catch (err) {
//     next(err);
//   }
// };

// const deleteProduct = async (req, res, next) => {
//   try {
//     await deleteProductById(req.params.id);
//     res.status(204).end();
//   } catch (err) {
//     next(err);
//   }
// };

// const deleteProductImage = async (req, res, next) => {
//   try {
//     await deleteProductImageById(req.params.imageId);
//     res.status(204).end();
//   } catch (err) {
//     next(err);
//   }
// };

// export { getProducts, getSpecificProduct, createProduct, updateProduct, deleteProduct, deleteProductImage };


import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import createError from 'http-errors';  // Assuming you are using this for error handling
import {
  getAllProducts,
  getProductById,
  getProductImagesByProductId,
  insertProduct,
  updateProductById,
  deleteProductById,
  addProductImages,
  deleteProductImageById,
} from '../models/productModel';

const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

const getSpecificProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await getProductById(req.params.id);
    const images = await getProductImagesByProductId(req.params.id);
    res.json({ ...product, images });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await insertProduct(req.body);

    const images = req.files.map((file: Express.Multer.File, idx: number) => {
      const isPrimary = Array.isArray(req.body.is_primary)
        ? req.body.is_primary[idx] === 'true'
        : req.body.is_primary === 'true';  // For single image upload
      return {
        product_id: product.product_id,
        image_url: `/uploads/products/${file.filename}`,
        is_primary: isPrimary
      };
    });

    if (images.length > 0) {
      try {
        await addProductImages(images);
      } catch (dbError) {
        // Delete all uploaded files if image insertion fails
        images.forEach((img: any) => {
          const filePath = path.join(__dirname, '../../uploads', img.image_url.replace('/uploads/', ''));
          fs.unlink(filePath, (err) => {
            if (err) console.error(`Failed to delete image file: ${filePath}`, err);
          });
        });
        throw dbError;
      }
    }

    res.status(201).json({ ...product, images });
  } catch (err: any) {
    console.error("Error in createProduct:", err);

    // Handle Multer file size errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(createError(413, 'File size is too large. Max 2MB allowed.'));
    }

    // Handle unique constraint errors (e.g., duplicate product code)
    if (err.code === '23505') {
      const message = err.detail.includes("product_code")
        ? 'A product with this code already exists.'
        : 'A unique constraint violation occurred.';
      return next(createError(409, message));
    }

    // General server error
    return next(createError(500, 'An unexpected error occurred while creating the product.'));
  }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const product = await updateProductById(req.params.id, req.body);
    if (req.body.images?.length) {
      await addProductImages(req.body.images);
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteProductById(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const deleteProductImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteProductImageById(req.params.imageId);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export { getProducts, getSpecificProduct, createProduct, updateProduct, deleteProduct, deleteProductImage };
