import pool from '../config/db.js';

export const createFactory = async (name) => {
  const result = await pool.query(
    'INSERT INTO factories (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
};

export const getFactoryByName = async (name) => {
  const result = await pool.query('SELECT * FROM factories WHERE name = $1', [name]);
  return result.rows[0];
};

export const getAllFactories = async () => {
    const result = await pool.query('SELECT id, name FROM factories ORDER BY name ASC');
    return result.rows;
};