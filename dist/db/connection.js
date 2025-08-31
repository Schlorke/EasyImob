"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.dbConfig = void 0;
exports.testConnection = testConnection;
exports.closeConnection = closeConnection;
const promise_1 = __importDefault(require("mysql2/promise"));
exports.dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'how7_easyimob',
};
exports.pool = promise_1.default.createPool({
    ...exports.dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
});
async function testConnection() {
    try {
        const connection = await exports.pool.getConnection();
        await connection.ping();
        connection.release();
        console.log('✅ Database connection successful');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        throw error;
    }
}
async function closeConnection() {
    try {
        await exports.pool.end();
        console.log('🔌 Database connection closed');
    }
    catch (error) {
        console.error('❌ Error closing database connection:', error);
        throw error;
    }
}
//# sourceMappingURL=connection.js.map