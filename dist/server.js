"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const connection_1 = require("@/db/connection");
async function startServer() {
    try {
        await (0, connection_1.testConnection)();
        const app = (0, app_1.createApp)();
        const port = parseInt(process.env.PORT || '3000');
        const server = app.listen(port, () => {
            console.log('🚀 HOW VII - EasyImob Backend Server');
            console.log(`📍 Server running on port ${port}`);
            console.log(`🌐 Base URL: http://localhost:${port}`);
            console.log('📋 Available endpoints:');
            console.log('  GET /health');
            console.log('  GET /raw/payments');
            console.log('  GET /analytics/payments-by-property');
            console.log('  GET /analytics/sales-by-month');
            console.log('  GET /analytics/sales-share-by-type');
            console.log('');
            console.log('📊 Ready to serve analytics data!');
        });
        const gracefulShutdown = async (signal) => {
            console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
            server.close(async () => {
                console.log('✅ HTTP server closed');
                try {
                    await (0, connection_1.closeConnection)();
                    console.log('✅ Database connection closed');
                    process.exit(0);
                }
                catch (error) {
                    console.error('❌ Error during shutdown:', error);
                    process.exit(1);
                }
            });
            setTimeout(() => {
                console.log('⚠️  Forcing shutdown due to timeout');
                process.exit(1);
            }, 10000);
        };
        process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => void gracefulShutdown('SIGINT'));
    }
    catch (error) {
        console.error('💥 Failed to start server:', error);
        process.exit(1);
    }
}
process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    process.exit(1);
});
void startServer();
//# sourceMappingURL=server.js.map