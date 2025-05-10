// import pool from '../config/db.js';

// export const createFactory = async (name) => {
//   const result = await pool.query(
//     'INSERT INTO factories (name) VALUES ($1) RETURNING *',
//     [name]
//   );
//   return result.rows[0];
// };

// export const getFactoryByName = async (name) => {
//   const result = await pool.query('SELECT * FROM factories WHERE name = $1', [name]);
//   return result.rows[0];
// };

// export const getAllFactories = async () => {
//     const result = await pool.query('SELECT id, name FROM factories ORDER BY name ASC');
//     return result.rows;
// };


import pool from '../config/db';

// Define the Factory type for stricter typing
export interface Factory {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

// Define a simplified Factory type for listing all factories
export interface FactorySummary {
  id: number;
  name: string;
}

// Create a new factory
export const createFactory = async (name: string): Promise<Factory> => {
  const result = await pool.query(
    'INSERT INTO factories (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
};

// Get a factory by name
export const getFactoryByName = async (name: string): Promise<Factory | undefined> => {
  const result = await pool.query('SELECT * FROM factories WHERE name = $1', [name]);
  return result.rows[0];
};

// Get all factories
export const getAllFactories = async (): Promise<FactorySummary[]> => {
  const result = await pool.query('SELECT id, name FROM factories ORDER BY name ASC');
  return result.rows;
};
