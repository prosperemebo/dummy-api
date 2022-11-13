import { RequestHandler, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ResponseStatus } from '../abstracts/enums';
import { ResponseData } from '../abstracts/interfaces';
import APIFeatures from '../utils/apiFeatures';
import AppError from '../utils/appError';
import CatchAsync from '../utils/catchAsync';

export const deleteOne = (Model: mongoose.Model<any, any>) =>
  CatchAsync(
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return next(
          new AppError(
            `No document found with ID of '${req.params.id}' on ${Model.modelName}.`,
            404
          )
        );
      }

      const response: ResponseData = {
        status: ResponseStatus.success,
        data: null,
      };

      return res.status(204).json(response);
    }
  );

export const updateOne = (Model: mongoose.Model<any, any>) =>
  CatchAsync(
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return next(
          new AppError(
            `No document found with ID of '${req.params.id}' on ${Model.modelName}`,
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

      return res.status(201).json(response);
    }
  );

export const createOne = (Model: mongoose.Model<any, any>) =>
  CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);

    const response: ResponseData = {
      status: ResponseStatus.success,
      data: {
        data: doc,
      },
    };

    return res.status(201).json(response);
  });

export const getOne = (
  Model: mongoose.Model<any, any>,
  ...populateOpt: {
    path: string;
    select?: string;
    model?: mongoose.Model<any, any>;
  }[]
) =>
  CatchAsync(
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      let query = Model.findById(req.params.id);

      if (populateOpt) {
        populateOpt.forEach((opt: any) => {
          query = query.populate(opt);
        });
      }

      const doc = await query;

      if (!doc) {
        return next(
          new AppError(
            `No document found with ID of '${req.params.id}' on ${Model.modelName}.`,
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

export const getAll = (
  Model: mongoose.Model<any, any>,
  ...populateOpt: {
    path: string;
    select?: string;
    model?: mongoose.Model<any, any>;
  }[]
) =>
  CatchAsync(
    async (
      req: Request<
        {},
        {},
        {},
        { sort: string; fields: string; page: string; limit: string }
      >,
      res: Response,
      next: NextFunction
    ) => {
      const features = new APIFeatures(Model.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

      // if (populateOpt) features.query.populate(populateOpt);

      if (populateOpt) {
        populateOpt.forEach((opt: any) => {
          features.query.populate(opt);
        });
      }

      // EXECUTE QUERY
      const doc = await features.query;

      const response: ResponseData = {
        status: ResponseStatus.success,
        results: doc.length,
        data: {
          data: doc,
        },
      };

      return res.status(200).json(response);
    }
  );
