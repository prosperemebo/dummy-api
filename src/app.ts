import express, { Application, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { NODE_ENV } from './abstracts/enums';
import globalErrorHandler from './controllers/errorController';
import { insuranceRouter } from './routes/insuranceRoutes';
import { userRouter } from './routes/userRoutes';
import AppError from './utils/appError';

const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app: Application = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development Logging
// if (process.env.NODE_ENV === NODE_ENV.development) {
// }
app.use(morgan('dev'));

// Limits requests from the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, Reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: ['price', 'ratingsQuantity', 'ratingsQuantity'],
  })
);

// Add requetTime to Request
app.use((req: Request, res: Response, next: NextFunction) => {
  Object.assign(req, { requestTime: new Date().toISOString() });

  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/insurance', insuranceRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      `Can't find '${req.originalUrl}':${req.method} on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

export default app;
