import express from 'express';
import { getFactories } from '../controllers/factoryController.js';

const router = express.Router();

router.get('/factories', getFactories);

export default router;