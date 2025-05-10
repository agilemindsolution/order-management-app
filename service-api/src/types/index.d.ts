import { Request } from 'express';

// Extend the Express Request object globally
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export {};
