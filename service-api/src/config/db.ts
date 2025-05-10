// import dotenv from 'dotenv';
// dotenv.config();
// import pkg from 'pg';
// const { Pool } = pkg;
// const sql = new Pool({  
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // Supabase requires SSL
//   },
// });
// //gitToken
// export default sql;

import dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';

// Create a Pool connection to the PostgreSQL database
const sql = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Supabase requires SSL
  },
});

export default sql;
