import express, { Request, Response, NextFunction } from 'express';
import logger from '../utility/logger';
import MechanicModel from '../models/mechanicModel';

interface Mechanic {
  id: string;
  name: string;
  password: string;
  role: string;
  createdAt: Date;
  email: string;
}

export const getAllMechanics = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const query = req.query;
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await MechanicModel.find(query),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const getMechanic = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      method: 'Get',
      data: await MechanicModel.findById(req.params.id),
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};

export const createMechanic = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newMechanic = await MechanicModel.create(req.body);
    res.status(201).json({
      status: 'success',
      method: 'Post',
      data: newMechanic,
    });
  } catch (err: any) {
    logger.log(err);
    next(err);
  }
};
