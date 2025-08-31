"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("@/routes");
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: process.env.NODE_ENV === 'production' ? false : true,
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((req, _res, next) => {
        console.log(`📡 ${req.method} ${req.path} - ${new Date().toISOString()}`);
        next();
    });
    app.use('/', (0, routes_1.createRoutes)());
    app.use('*', (_req, res) => {
        res.status(404).json({
            error: 'Route not found',
            message: 'The requested endpoint does not exist',
        });
    });
    app.use((error, _req, res, _next) => {
        console.error('💥 Global error handler:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message,
        });
    });
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map