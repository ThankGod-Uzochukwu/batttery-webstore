import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import swaggerUi from 'swagger-ui-express';

// TOOD fix this typo error
// import xss from 'xss-clean';
import dotenv from 'dotenv';
import productsRouter from './modules/products/routes';
import brandsRouter from './modules/brands/brand.routes';
import categoryRouter from './modules/categories/category.routes';
import errorHandler from './middleware/error.middleware';
import openApiDocument from './docs/openapi';

dotenv.config();

const app: Express = express();
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

// Security middleware
app.use(helmet());
app.use(hpp());
// app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// CORS
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
    })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logging
app.use(morgan('combined'));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// API routes
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Battery Store API v1' });
});

app.get('/api/docs.json', (req, res) => {
    res.status(200).json(openApiDocument);
});

// Mount routes
app.use('/brands', brandsRouter);
app.use('/category', categoryRouter);
app.use('/products', productsRouter);

app.use('/api/brands', brandsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/products', productsRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

export default app;
