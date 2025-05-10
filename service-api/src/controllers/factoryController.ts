// import { getAllFactories } from '../models/factoryModel.js';

// export const getFactories = async (req, res) => {
//   try {
//     const factories = await getAllFactories();
//     res.status(200).json(factories);
//   } catch (error) {
//     console.error('Error getting factories:', error);
//     res.status(500).json({ message: 'Failed to retrieve factories' });
//   }
// };


import { Request, Response } from 'express';
import { getAllFactories } from '../models/factoryModel';

export const getFactories = async (req: Request, res: Response): Promise<void> => {
  try {
    const factories = await getAllFactories();
    res.status(200).json(factories);
  } catch (error) {
    console.error('Error getting factories:', error);
    res.status(500).json({ message: 'Failed to retrieve factories' });
  }
};
