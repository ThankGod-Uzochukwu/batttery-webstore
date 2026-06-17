# Node.js Backend Starter Setup

## Overview

This project is a production-ready backend starter architecture using:

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Zod Validation
- Winston Logging
- Helmet Security
- CORS
- Rate Limiting
- Input Sanitization
- Vitest + Supertest Testing

---

# Tech Stack

| Technology         | Purpose                             |
| ------------------ | ----------------------------------- |
| Node.js            | Runtime                             |
| Express.js         | API framework                       |
| TypeScript         | Type safety                         |
| PostgreSQL         | Database                            |
| Drizzle ORM        | ORM                                 |
| Zod                | Validation                          |
| Winston            | Logging                             |
| Helmet             | Security headers                    |
| CORS               | Cross-origin handling               |
| express-rate-limit | Rate limiting                       |
| hpp                | HTTP parameter pollution protection |
| xss-clean          | XSS sanitization                    |
| Vitest             | Testing                             |
| Supertest          | API testing                         |

---

# Project Structure

```bash
src/
├── app.ts
├── server.ts
│
├── config/
│   ├── db.ts
│   ├── env.ts
│   ├── logger.ts
│
├── modules/
│   ├── auth/
│   ├── exam/
│   ├── student/
│
├── middleware/
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   ├── error.middleware.ts
│   ├── sanitize.middleware.ts
│
├── db/
│   ├── schema/
│   ├── migrations/
│
├── utils/
│   ├── AppError.ts
│   ├── response.ts
│
├── tests/
│
└── types/
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd backend
```

---

# Install Dependencies

## Core Dependencies

```bash
npm install express dotenv cors helmet compression morgan
```

---

## TypeScript

```bash
npm install -D typescript ts-node-dev @types/node @types/express
```

---

## Database + ORM

```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit
```

---

## Validation

```bash
npm install zod
```

---

## Security

```bash
npm install express-rate-limit hpp xss-clean
```

---

## Logging

```bash
npm install winston
```

---

## Testing

```bash
npm install -D vitest supertest @types/supertest
```

---

# TypeScript Configuration

Create `tsconfig.json`

```json
{
	"compilerOptions": {
		"target": "ES2022",
		"module": "CommonJS",
		"rootDir": "./src",
		"outDir": "./dist",
		"strict": true,
		"esModuleInterop": true,
		"moduleResolution": "node"
	}
}
```

---

# Environment Variables

Create `.env`

```env
PORT=5000

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/exam_system

JWT_SECRET=secret

NODE_ENV=development
```

---

# Scripts

Add to `package.json`

```json
{
	"scripts": {
		"dev": "ts-node-dev --respawn --transpile-only src/server.ts",
		"build": "tsc",
		"start": "node dist/server.js",
		"test": "vitest"
	}
}
```

---

# Drizzle ORM Setup

## drizzle.config.ts

```ts
import type { Config } from "drizzle-kit";

export default {
	schema: "./src/db/schema",
	out: "./src/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
} satisfies Config;
```

---

# Database Connection

## src/config/db.ts

```ts
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client);
```

---

# Express App Setup

## src/app.ts

```ts
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import xss from "xss-clean";

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(hpp());

app.use(xss());

app.use(
	rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100
	})
);

export default app;
```

---

# Server Entry

## src/server.ts

```ts
import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
```

---

# Global Validation Middleware

## middleware/validation.middleware.ts

```ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
	(schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				success: false,
				errors: result.error.flatten()
			});
		}

		req.body = result.data;

		next();
	};
```

---

# Global Error Handler

## middleware/error.middleware.ts

```ts
import { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	return res.status(err.statusCode || 500).json({
		success: false,
		message: err.message || "Internal Server Error"
	});
};
```

---

# Winston Logger

## config/logger.ts

```ts
import winston from "winston";

export const logger = winston.createLogger({
	level: "info",

	transports: [
		new winston.transports.Console(),

		new winston.transports.File({
			filename: "logs/error.log",
			level: "error"
		})
	]
});
```

---

# Running Migrations

## Generate Migration

```bash
npx drizzle-kit generate
```

---

## Run Migration

```bash
npx drizzle-kit migrate
```

---

# Testing Setup

## vitest.config.ts

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true
	}
});
```

---

# Example Test

```ts
import request from "supertest";
import app from "../app";

describe("Health", () => {
	it("should return 200", async () => {
		const res = await request(app).get("/health");

		expect(res.status).toBe(200);
	});
});
```

---

# Security Features Included

- Helmet security headers
- Rate limiting
- HTTP parameter pollution protection
- XSS sanitization
- Request validation
- Centralized error handling

---

# Recommended Architecture

```text
Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Database
```

---

# Next Improvements

- JWT Authentication
- Refresh Token System
- Redis Caching
- Docker Setup
- CI/CD Pipelines
- File Upload System
- Role-Based Access Control
- OpenAPI / Swagger Documentation

---

---

# Recommended Commands

## Start Development Server

```bash
npm run dev
```

---

## Run Tests

```bash
npm run test
```

---

## Build Project

```bash
npm run build
```

---

# Notes

- Keep controllers thin
- Put business logic inside services
- Use repositories for database queries
- Validate all incoming requests
- Never trust client input
- Centralize error handling
- Keep environment variables secure
