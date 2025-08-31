"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHealthRoutes = void 0;
const express_1 = require("express");
const createHealthRoutes = (healthController) => {
    const router = (0, express_1.Router)();
    router.get('/health', (req, res) => {
        void healthController.getHealth(req, res);
    });
    return router;
};
exports.createHealthRoutes = createHealthRoutes;
//# sourceMappingURL=health.routes.js.map