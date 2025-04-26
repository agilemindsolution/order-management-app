import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import registerRoutes from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());

registerRoutes(app);

// app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));