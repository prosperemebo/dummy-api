import { ResponseStatus } from '../abstracts/enums';
import { AppErrorInterface } from '../abstracts/interfaces';

class AppError extends Error implements AppErrorInterface {
  statusCode: number;
  isOperational: boolean;
  status: ResponseStatus;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    this.status = `${statusCode}`.startsWith('4')
      ? ResponseStatus.fail
      : ResponseStatus.error;

    //   ADDS THE ERROR STACK TO THE ERROR OBJECT
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
