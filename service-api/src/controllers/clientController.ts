// import {
//   getAllClients,
//   getClientById,
//   insertClient,
//   updateClientById,
//   deleteClientById
// } from '../models/clientModel.js';

// const getClients = async (req, res) => {  
//   try {
//     const result = await getAllClients();
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const getSpecificClient = async (req, res) => {
//   const client_id = req.params.id;
//   try {
//     const result = await getClientById(client_id);
//     res.json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const addClient = async (req, res) => {  
//   const insertData = req.body;
//   try {
//     const result = await insertClient(insertData);
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const updateClient = async (req, res) => {  
//   const client_id = req.params.id;
//   const updateData = req.body;
//   try {
//     const result = await updateClientById(client_id, updateData);
//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// const deleteClient = async (req, res) => {
//   const client_id = req.params.id;  
//   try {
//     const result = await deleteClientById(client_id);
//     res.status(200).json(result.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export { getClients, getSpecificClient, addClient, updateClient, deleteClient };


import { Request, Response } from 'express';
import {
  getAllClients,
  getClientById,
  insertClient,
  updateClientById,
  deleteClientById
} from '../models/clientModel';

const getClients = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await getAllClients();
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getSpecificClient = async (req: Request, res: Response): Promise<void> => {
  const client_id = req.params.id;
  try {
    const result = await getClientById(client_id);
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const addClient = async (req: Request, res: Response): Promise<void> => {
  const insertData = req.body;
  try {
    const result = await insertClient(insertData);
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const updateClient = async (req: Request, res: Response): Promise<void> => {
  const client_id = req.params.id;
  const updateData = req.body;
  try {
    const result = await updateClientById(client_id, updateData);
    res.status(200).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const deleteClient = async (req: Request, res: Response): Promise<void> => {
  const client_id = req.params.id as any;
  try {
    const result = await deleteClientById(client_id);
    res.status(200).json(result.rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export { getClients, getSpecificClient, addClient, updateClient, deleteClient };
