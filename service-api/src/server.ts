import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import notFound from './middlewares/notFound';
import registerRoutes from './routes';
import authRoutes from './routes/authRoutes';
import path from 'path';

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Auth Routes
app.use('/api/auth', authRoutes);

// Application Routes
registerRoutes(app);

// Not Found Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`⚡️ Server running on port ${PORT}`));
