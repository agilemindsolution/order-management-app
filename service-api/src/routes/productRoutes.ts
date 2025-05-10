import { Router } from 'express';
import { getProducts, getSpecificProduct, createProduct, updateProduct, deleteProduct, deleteProductImage  } from '../controllers/productController';
import { upload } from '../config/multerconfig';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getSpecificProduct);
router.post('/', upload.array('images', 10), createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// router.post('/:id/images', addProductImage);
router.delete('/:id/images/:imageId', deleteProductImage);

export default router;