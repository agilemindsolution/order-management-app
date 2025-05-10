// import pool from '../config/db.js';

// export const findUserByEmail = async (email) => {
//   const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//   return result.rows[0];
// };

// export const createUser = async ({ name, email, hashedPassword, role, factoryId }) => {
//   const result = await pool.query(
//     `INSERT INTO users (name, email, password, role, factory_id) 
//      VALUES ($1, $2, $3, $4, $5) 
//      RETURNING *`,
//     [name, email, hashedPassword, role, factoryId]
//   );
//   return result.rows[0];
// };


import pool from '../config/db';

// Define the User type
export interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  factory_id?: number;
  created_at: Date;
  updated_at: Date;
}

// Find a user by email
export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  const result = await pool.query<User>(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

// Create a new user
interface CreateUserInput {
  name: string;
  email: string;
  hashedPassword: string;
  role: string;
  factoryId?: number;
}

export const createUser = async ({
  name,
  email,
  hashedPassword,
  role,
  factoryId
}: CreateUserInput): Promise<User> => {
  const result = await pool.query<User>(
    `INSERT INTO users (name, email, password, role, factory_id) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`,
    [name, email, hashedPassword, role, factoryId]
  );
  return result.rows[0];
};
