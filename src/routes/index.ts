import { Router } from 'express';
import { PaymentsRepository } from '@/repositories/payments.repository';
import { AnalyticsService } from '@/services/analytics.service';
import { createHealthController } from '@/controllers/health.controller';
import { createAnalyticsController } from '@/controllers/analytics.controller';
import { createHealthRoutes } from './health.routes';
import { createAnalyticsRoutes } from './analytics.routes';

/**
 * Main routes configuration with dependency injection
 */
export const createRoutes = (): Router => {
  const router = Router();

  // Initialize dependencies
  const paymentsRepository = new PaymentsRepository();
  const analyticsService = new AnalyticsService();

  // Initialize controllers
  const healthController = createHealthController(paymentsRepository);
  const analyticsController = createAnalyticsController(paymentsRepository, analyticsService);

  // Register route modules
  const healthRoutes = createHealthRoutes(healthController);
  const analyticsRoutes = createAnalyticsRoutes(analyticsController);

  // Mount routes
  router.use('/', healthRoutes);
  router.use('/', analyticsRoutes);

  return router;
};
