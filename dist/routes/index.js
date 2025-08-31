"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const express_1 = require("express");
const payments_repository_1 = require("@/repositories/payments.repository");
const analytics_service_1 = require("@/services/analytics.service");
const health_controller_1 = require("@/controllers/health.controller");
const analytics_controller_1 = require("@/controllers/analytics.controller");
const health_routes_1 = require("./health.routes");
const analytics_routes_1 = require("./analytics.routes");
const createRoutes = () => {
    const router = (0, express_1.Router)();
    const paymentsRepository = new payments_repository_1.PaymentsRepository();
    const analyticsService = new analytics_service_1.AnalyticsService();
    const healthController = (0, health_controller_1.createHealthController)(paymentsRepository);
    const analyticsController = (0, analytics_controller_1.createAnalyticsController)(paymentsRepository, analyticsService);
    const healthRoutes = (0, health_routes_1.createHealthRoutes)(healthController);
    const analyticsRoutes = (0, analytics_routes_1.createAnalyticsRoutes)(analyticsController);
    router.use('/', healthRoutes);
    router.use('/', analyticsRoutes);
    return router;
};
exports.createRoutes = createRoutes;
//# sourceMappingURL=index.js.map