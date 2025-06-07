// import sql from '../src/config/db.js';
// const getOrders = async (req, res) => {
//   try {
//     const result = await sql.query('SELECT * FROM orders');
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const addOrder = async (req, res) => {
//   try {
//     const { client_id, product_id, quantity } = req.body;
//     const result = await sql.query('INSERT INTO orders (client_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [client_id, product_id, quantity]);
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export { getOrders, addOrder };

// import { Request, Response } from 'express';
import sql from '../config/db';
import { Request, Response, NextFunction } from 'express';
import { createOrder, getOrderById, updateOrderById, deleteOrderById, getOrders } from '../models/orderModel';

export const createOrderHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getOrdersHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderByIdHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = await getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrderHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedOrder = await updateOrderById(req.params.id, req.body);
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrderHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await deleteOrderById(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};