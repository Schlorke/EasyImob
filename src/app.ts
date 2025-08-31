import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { createRoutes } from '@/routes';

/**
 * Express application configuration
 */
export const createApp = (): Application => {
  const app = express();

  // Middleware configuration
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? false : true,
    credentials: true,
  }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging middleware
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`📡 ${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });

  // API routes
  app.use('/', createRoutes());

  // 404 handler
  app.use('*', (_req: Request, res: Response) => {
    res.status(404).json({
      error: 'Route not found',
      message: 'The requested endpoint does not exist',
    });
  });

  // Global error handler
  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('💥 Global error handler:', error);
    
    res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message,
    });
  });

  return app;
};
