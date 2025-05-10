import { Express } from 'express';
import clientRoutes from './clientRoutes';
import productRoutes from './productRoutes';
import orderRoutes from './orderRoutes';
import factoryRoutes from './factoryRoutes';

export default function registerRoutes(app: Express): void {
  app.use('/api', factoryRoutes);
  app.use('/api/clients', clientRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
}
