import { Router } from 'express';
import { getDashboardMetrics, getOrderStatusSummary, getRecentOrders } from '../controllers/dashboardController';

const router = Router();
console.log("calling here routes atleast");

router.get('/metrics', getDashboardMetrics);
router.get('/status', getOrderStatusSummary);
router.get('/recent', getRecentOrders);

export default router;
