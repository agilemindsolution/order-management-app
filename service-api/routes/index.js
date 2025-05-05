import clientRoutes from './clientRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import factoryRoutes from './factoryRoutes.js';

export default function registerRoutes(app) {
  app.use('/api', factoryRoutes);
  app.use('/api/clients', clientRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
}
