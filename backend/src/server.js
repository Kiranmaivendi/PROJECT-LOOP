import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import organizationRoutes from './routes/organizationRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/project-loop';

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'project-loop' }));
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/notifications', notificationRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '../../frontend/dist/index.html')));
}

app.use(errorHandler);

const startServer = () => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

const isLocalMongo = mongoUri.includes('127.0.0.1') || mongoUri.includes('localhost');

if (process.env.NODE_ENV === 'production') {
  if (!process.env.MONGO_URI || isLocalMongo) {
    logger.error('Production deploy requires a real MONGO_URI; localhost is not available on Render or Vercel.');
    process.exit(1);
  }
  mongoose.connect(mongoUri)
    .then(() => {
      logger.info('MongoDB connected');
      startServer();
    })
    .catch((error) => {
      logger.error('MongoDB connection failed', error);
      process.exit(1);
    });
} else {
  if (isLocalMongo) {
    logger.warn('MongoDB URI points to localhost; continuing without a database connection for local development.');
    startServer();
  } else {
    mongoose.connect(mongoUri)
      .then(() => {
        logger.info('MongoDB connected');
        startServer();
      })
      .catch((error) => {
        logger.error('MongoDB connection failed', error);
        startServer();
      });
  }
}
