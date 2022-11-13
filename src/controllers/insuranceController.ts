import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ResponseStatus } from '../abstracts/enums';
import { ResponseData } from '../abstracts/interfaces';
import Insurance from '../models/Insurance';
import AppError from '../utils/appError';
import CatchAsync from '../utils/catchAsync';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory';

export const getAllInsurance: RequestHandler = getAll(Insurance);

export const getInsurance: RequestHandler = getOne(Insurance);

export const getInsurancePolicy: RequestHandler = CatchAsync(
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    let query = Insurance.findOne({ policyNumber: req.params.id });

    const doc = await query;

    if (!doc) {
      return next(
        new AppError(
          `No document found with ID of '${req.params.id}' on ${Insurance.modelName}.`,
          404
        )
      );
    }

    const response: ResponseData = {
      status: ResponseStatus.success,
      data: {
        data: doc,
      },
    };

    return res.status(200).json(response);
  }
);

export const createInsurance: RequestHandler = createOne(Insurance);

export const updateInsurance: RequestHandler = updateOne(Insurance);

export const deleteInsurance: RequestHandler = deleteOne(Insurance);
