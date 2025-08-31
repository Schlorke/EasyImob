import mysql from 'mysql2/promise';
import { DatabaseConfig } from '@/types';
export declare const dbConfig: DatabaseConfig;
export declare const pool: mysql.Pool;
export declare function testConnection(): Promise<void>;
export declare function closeConnection(): Promise<void>;
//# sourceMappingURL=connection.d.ts.map