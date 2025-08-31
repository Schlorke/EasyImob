"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnalyticsController = exports.AnalyticsController = void 0;
class AnalyticsController {
    paymentsRepository;
    analyticsService;
    constructor(paymentsRepository, analyticsService) {
        this.paymentsRepository = paymentsRepository;
        this.analyticsService = analyticsService;
    }
    async getRawPayments(_req, res) {
        try {
            const data = await this.paymentsRepository.getAllPaymentsData();
            res.status(200).json(data);
        }
        catch (error) {
            console.error('❌ Error in getRawPayments:', error);
            res.status(500).json([]);
        }
    }
    async getPaymentsByProperty(_req, res) {
        try {
            const rawData = await this.paymentsRepository.getAllPaymentsData();
            const result = this.analyticsService.calculatePaymentsByProperty(rawData);
            res.status(200).json(result);
        }
        catch (error) {
            console.error('❌ Error in getPaymentsByProperty:', error);
            res.status(500).json([]);
        }
    }
    async getSalesByMonth(_req, res) {
        try {
            const rawData = await this.paymentsRepository.getAllPaymentsData();
            const result = this.analyticsService.calculateSalesByMonth(rawData);
            res.status(200).json(result);
        }
        catch (error) {
            console.error('❌ Error in getSalesByMonth:', error);
            res.status(500).json({ series: [] });
        }
    }
    async getSalesShareByType(_req, res) {
        try {
            const rawData = await this.paymentsRepository.getAllPaymentsData();
            const result = this.analyticsService.calculateSalesShareByType(rawData);
            res.status(200).json(result);
        }
        catch (error) {
            console.error('❌ Error in getSalesShareByType:', error);
            res.status(500).json({ share: [], total: 0 });
        }
    }
}
exports.AnalyticsController = AnalyticsController;
const createAnalyticsController = (paymentsRepository, analyticsService) => {
    return new AnalyticsController(paymentsRepository, analyticsService);
};
exports.createAnalyticsController = createAnalyticsController;
//# sourceMappingURL=analytics.controller.js.map