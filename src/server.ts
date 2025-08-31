import 'dotenv/config';
import { createApp } from './app';
import { testConnection, closeConnection } from '@/db/connection';

/**
 * Server bootstrap and configuration
 */
async function startServer(): Promise<void> {
  try {
    // Test database connection first
    await testConnection();

    // Create Express app
    const app = createApp();
    const port = parseInt(process.env.PORT || '3000');

    // Start server
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

    // Graceful shutdown
    const gracefulShutdown = async (signal: string): Promise<void> => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

      server.close(async () => {
        console.log('✅ HTTP server closed');

        try {
          await closeConnection();
          console.log('✅ Database connection closed');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.log('⚠️  Forcing shutdown due to timeout');
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => void gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => void gracefulShutdown('SIGINT'));
  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

// Start the server
void startServer();
