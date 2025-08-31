import { Router } from 'express';
import { AnalyticsController } from '@/controllers/analytics.controller';

/**
 * Analytics routes configuration
 */
export const createAnalyticsRoutes = (analyticsController: AnalyticsController): Router => {
  const router = Router();

  // GET /raw/payments - Returns raw JOIN data
  router.get('/raw/payments', (req, res) => {
    void analyticsController.getRawPayments(req, res);
  });

  // GET /analytics/payments-by-property - Total payments per property
  router.get('/analytics/payments-by-property', (req, res) => {
    void analyticsController.getPaymentsByProperty(req, res);
  });

  // GET /analytics/sales-by-month - Sales totals by month/year
  router.get('/analytics/sales-by-month', (req, res) => {
    void analyticsController.getSalesByMonth(req, res);
  });

  // GET /analytics/sales-share-by-type - Percentage share by property type
  router.get('/analytics/sales-share-by-type', (req, res) => {
    void analyticsController.getSalesShareByType(req, res);
  });

  return router;
};
