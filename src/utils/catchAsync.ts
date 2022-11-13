import { Request, Response, NextFunction } from 'express';

/**
 * The catch async function expects a function with three params
 * since the expected function is asynchronos is has potential failure
 * the expectedfunction is being executed with the three params and caught
 * The catch async function returns a function
 * the function is assined to where it is used
 */

const CatchAsync: Function =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch((err: Error) => next(err));

export default CatchAsync;
