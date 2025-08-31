import { Router } from 'express';
import { HealthController } from '@/controllers/health.controller';

/**
 * Health routes configuration
 */
export const createHealthRoutes = (healthController: HealthController): Router => {
  const router = Router();

  // GET /health - System health check
  router.get('/health', (req, res) => {
    void healthController.getHealth(req, res);
  });

  return router;
};
