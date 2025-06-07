import { Router } from 'express';
import { createOrderHandler, getOrdersHandler, getOrderByIdHandler, updateOrderHandler, deleteOrderHandler } from '../controllers/orderController';

const router = Router();

router.get('/', getOrdersHandler);
router.get('/:id', getOrderByIdHandler);
router.post('/', createOrderHandler);
router.put('/:id', updateOrderHandler);
router.delete('/:id', deleteOrderHandler);

export default router;
