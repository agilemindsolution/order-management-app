import { Router } from 'express';
import { getOrders, addOrder } from '../controllers/orderController';

const router = Router();

router.get('/', getOrders);
router.post('/', addOrder);

export default router;