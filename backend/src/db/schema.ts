import { pgTable, serial, varchar, text, decimal, timestamp, boolean } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    stock: serial('stock').notNull().default(0),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const orders = pgTable('orders', {
    id: serial('id').primaryKey(),
    userId: serial('user_id').references(() => users.id),
    totalPrice: decimal('total_price', { precision: 12, scale: 2 }).notNull(),
    status: varchar('status', { length: 50 }).default('pending'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});
