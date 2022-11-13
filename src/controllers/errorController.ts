import { NextFunction, Request, RequestHandler, Response } from 'express';
import { NODE_ENV, ResponseStatus } from '../abstracts/enums';
import { ResponseData } from '../abstracts/interfaces';
import AppError from '../utils/appError';

const handleCasttErrorDB: Function = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB: Function = (err: any) => {
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value of ${value}. Please use another value!'`;
  return new AppError(message, 400);
};

const handleValidationErrorDB: Function = (err: any) => {
  const errors: string[] = Object.values(err.errors).map(
    (el: any) => el.message
  );

  const message = `Invalid inut data. ${errors.join('. ')}`;
  return new AppError(message, 404);
};

const handleBodyParsingError: Function = (err: any) => {
  const message = `Invalid input data; ${err.message}.`;

  return new AppError(message, 400);
};

const handleJWTError: Function = () =>
  new AppError('Invalid token, please log in again!', 401);

const handleJWTExpiredError: Function = () =>
  new AppError('Your token has expired, please log in again!', 401);

const sendErrorDev: Function = (err: AppError, res: Response) => {
  const response: ResponseData = {
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  };

  res.status(err.statusCode).json(response);
};

const sendErrorProd: Function = (err: AppError, res: Response) => {
  if (err.isOperational) {
    // Operational Errors: Errors invoked my developer
    const response: ResponseData = {
      status: err.status,
      message: err.message,
    };

    res.status(err.statusCode).json(response);
  } else {
    // Programming error: Unknown error, do not leak details

    // 1) Log Error
    console.error('ERROR 💥', err);

    // 2) Send Generic Message
    const response: ResponseData = {
      status: ResponseStatus.error,
      message: 'Something went wrong!',
    };

    res.status(500).json(response);
  }
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || ResponseStatus.error;

  if (process.env.NODE_ENV === NODE_ENV.development) {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };

    Object.assign(error, { message: err.message, stack: err.stack });

    if (err.name === 'CastError') error = handleCasttErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.type === 'entity.parse.failed') error = handleBodyParsingError(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError();
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

export default globalErrorHandler;
