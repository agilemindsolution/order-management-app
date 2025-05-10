import { Router } from 'express';
import { getFactories } from '../controllers/factoryController';

const router = Router();

router.get('/factories', getFactories);

export default router;