// import { NextFunction, Request, Response } from 'express';
// import createError, { HttpError } from 'http-errors';

// export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
//   console.error(`[ERROR] ${err.status || 500} - ${err.message}`);
  
//   res.status(err.status || 500).json({
//     status: 'error',
//     message: err.expose ? err.message : 'Something went wrong. Please try again later.',
//     details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
//   });
// };

// export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
//   next(createError(404, 'Resource not found'));
// };

// export default errorHandler;

import { NextFunction, Request, Response } from 'express';
import createError, { HttpError } from 'http-errors';

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  console.error(`[ERROR] ${err.status || 500} - ${err.message}`);
  
  res.status(err.status || 500).json({
    status: 'error',
    message: err.expose ? err.message : 'Something went wrong. Please try again later.',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  next(createError(404, `Not Found - ${req.originalUrl}`));
};

export default errorHandler;
