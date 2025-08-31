"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnalyticsRoutes = void 0;
const express_1 = require("express");
const createAnalyticsRoutes = (analyticsController) => {
    const router = (0, express_1.Router)();
    router.get('/raw/payments', (req, res) => {
        void analyticsController.getRawPayments(req, res);
    });
    router.get('/analytics/payments-by-property', (req, res) => {
        void analyticsController.getPaymentsByProperty(req, res);
    });
    router.get('/analytics/sales-by-month', (req, res) => {
        void analyticsController.getSalesByMonth(req, res);
    });
    router.get('/analytics/sales-share-by-type', (req, res) => {
        void analyticsController.getSalesShareByType(req, res);
    });
    return router;
};
exports.createAnalyticsRoutes = createAnalyticsRoutes;
//# sourceMappingURL=analytics.routes.js.map