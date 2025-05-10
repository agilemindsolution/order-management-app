import { Router } from 'express';
import { getClients, getSpecificClient, addClient, updateClient, deleteClient } from '../controllers/clientController';
const router = Router();

router.get('/', getClients);
router.get('/:id', getSpecificClient);
router.post('/', addClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;