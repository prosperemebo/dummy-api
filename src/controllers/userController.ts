import { RequestHandler } from 'express';
import User from '../models/User';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory';

export const getAllUsers: RequestHandler = getAll(User);

export const getUser: RequestHandler = getOne(User);

export const createUser: RequestHandler = createOne(User);

export const updateUser: RequestHandler = updateOne(User);

export const deleteUser: RequestHandler = deleteOne(User);
