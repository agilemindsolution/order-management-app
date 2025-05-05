import pool from '../config/db.js';

export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const createUser = async ({ name, email, hashedPassword, role, factoryId }) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, factory_id) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [name, email, hashedPassword, role, factoryId]
  );
  return result.rows[0];
};