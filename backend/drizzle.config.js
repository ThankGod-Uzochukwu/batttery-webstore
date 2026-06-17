"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/battery_store',
    },
};
exports.default = config;
