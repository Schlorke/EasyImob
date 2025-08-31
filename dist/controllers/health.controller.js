"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHealthController = exports.HealthController = void 0;
class HealthController {
    paymentsRepository;
    constructor(paymentsRepository) {
        this.paymentsRepository = paymentsRepository;
    }
    async getHealth(_req, res) {
        try {
            const isDbHealthy = await this.paymentsRepository.healthCheck();
            if (!isDbHealthy) {
                res.status(503).json({ status: 'ok' });
                return;
            }
            res.status(200).json({ status: 'ok' });
        }
        catch (error) {
            console.error('❌ Health check failed:', error);
            res.status(503).json({ status: 'ok' });
        }
    }
}
exports.HealthController = HealthController;
const createHealthController = (paymentsRepository) => {
    return new HealthController(paymentsRepository);
};
exports.createHealthController = createHealthController;
//# sourceMappingURL=health.controller.js.map