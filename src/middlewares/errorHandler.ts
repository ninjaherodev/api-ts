import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';
import { ZodError } from 'zod';

interface ErrorDetails {
  issues?: any; 
}


export const logError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  next(error);
};


export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const createErrorResponse = (status: number, message: string, name: string, details: ErrorDetails = {}) => ({
    status,
    message,
    name,
    ...details
  });

  if (error instanceof ZodError) {
    return res
      .status(422)
      .json(
        createErrorResponse(422, 'Validation error', 'ZodError', {
          issues: error.issues
        })
      );
  }

  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .json(createErrorResponse(error.statusCode, error.message, error.name));
  }

  return res
    .status(error.statusCode || 500)
    .json(
      createErrorResponse(
        error.statusCode || 500,
        error.message || 'Internal Server Error',
        error.name || 'UnknownError'
      )
    );
}