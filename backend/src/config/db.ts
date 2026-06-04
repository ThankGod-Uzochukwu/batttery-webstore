import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from './env';
import logger from './logger';

let client: ReturnType<typeof postgres>;
let db: ReturnType<typeof drizzle>;

export async function initializeDatabase () {
    try
    {
        if (!env.DATABASE_URL)
        {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        client = postgres(env.DATABASE_URL);
        db = drizzle(client);

        logger.info('Database connection established');
        return db;
    } catch (error)
    {
        logger.error('Database connection failed:', error);
        throw error;
    }
}

export async function closeDatabase () {
    if (client)
    {
        await client.end();
        logger.info('Database connection closed');
    }
}

export function getDatabase () {
    if (!db)
    {
        throw new Error('Database not initialized. Call initializeDatabase first.');
    }
    return db;
}

export default db;
