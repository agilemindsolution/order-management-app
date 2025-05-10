// // middlewares/notFound.js
// const notFound = (req, res, next) => {
//     const error = new Error(`Not Found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
//   };
  
//   export default notFound;
  

import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = createError(404, `Not Found - ${req.originalUrl}`);
  next(error);
};

export default notFound;
