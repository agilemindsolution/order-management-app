// import sql from '../config/db.js';

// export const getAllClients = async () => {
//   return sql.query('SELECT * FROM client_master');
// };

// export const getClientById = async (id) => {
//   return sql.query('SELECT * FROM client_master WHERE client_id = $1', [id]);
// };

// export const insertClient = async (client) => {
//   const {
//     name,
//     contact_person,
//     email,
//     phone,
//     alternate_phone,
//     address,
//     city,
//     state,
//     country,
//     pin_code,
//     gst_number,
//     pan_number,
//     website,
//     created_by = 'AUTO',
//     updated_by = 'AUTO'
//   } = client;

//   return sql.query(
//     `INSERT INTO client_master (
//       client_name, contact_person, email, phone_number, alternate_phone, 
//       address, city, state, country, pin_code, gst_number, pan_number, 
//       website, created_by, updated_by
//     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
//     RETURNING *`,
//     [
//       name, contact_person, email, phone, alternate_phone, address,
//       city, state, country, pin_code, gst_number, pan_number,
//       website, created_by, updated_by
//     ]
//   );
// };

// export const updateClientById = async (id, client) => {
//   const {
//     name,
//     contact_person,
//     email,
//     phone,
//     alternate_phone,
//     address,
//     city,
//     state,
//     country,
//     pin_code,
//     gst_number,
//     pan_number,
//     website,
//     updated_by = 'AUTO'
//   } = client;

//   return sql.query(
//     `UPDATE client_master SET
//       client_name = $1, contact_person = $2, email = $3, phone_number = $4,
//       alternate_phone = $5, address = $6, city = $7, state = $8, country = $9,
//       pin_code = $10, gst_number = $11, pan_number = $12, website = $13, updated_by = $14
//     WHERE client_id = $15 RETURNING *`,
//     [
//       name, contact_person, email, phone, alternate_phone, address,
//       city, state, country, pin_code, gst_number, pan_number,
//       website, updated_by, id
//     ]
//   );
// };

// export const deleteClientById = async (id) => {
//   return sql.query('DELETE FROM client_master WHERE client_id = $1 RETURNING *', [id]);
// };


import sql from '../config/db';

// Define the Client type for stricter typing
export interface Client {
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  alternate_phone?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pin_code: string;
  gst_number: string;
  pan_number: string;
  website?: string;
  created_by?: string;
  updated_by?: string;
}

// Define the database row structure for clients
export interface ClientRow {
  client_id: number;
  client_name: string;
  contact_person: string;
  email: string;
  phone_number: string;
  alternate_phone: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  pin_code: string;
  gst_number: string;
  pan_number: string;
  website: string | null;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
}

// Fetch all clients
export const getAllClients = async (): Promise<{ rows: ClientRow[] }> => {
  return sql.query('SELECT * FROM client_master');
};

// Fetch a client by ID
export const getClientById = async (id: any): Promise<{ rows: ClientRow[] }> => {
  return sql.query('SELECT * FROM client_master WHERE client_id = $1', [id]);
};

// Insert a new client
export const insertClient = async (client: Client): Promise<{ rows: ClientRow[] }> => {
  const {
    name,
    contact_person,
    email,
    phone,
    alternate_phone = null,
    address,
    city,
    state,
    country,
    pin_code,
    gst_number,
    pan_number,
    website = null,
    created_by = 'AUTO',
    updated_by = 'AUTO'
  } = client;

  return sql.query(
    `INSERT INTO client_master (
      client_name, contact_person, email, phone_number, alternate_phone, 
      address, city, state, country, pin_code, gst_number, pan_number, 
      website, created_by, updated_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *`,
    [
      name, contact_person, email, phone, alternate_phone, address,
      city, state, country, pin_code, gst_number, pan_number,
      website, created_by, updated_by
    ]
  );
};

// Update a client by ID
export const updateClientById = async (id: any, client: Partial<Client>): Promise<{ rows: ClientRow[] }> => {
  const {
    name,
    contact_person,
    email,
    phone,
    alternate_phone = null,
    address,
    city,
    state,
    country,
    pin_code,
    gst_number,
    pan_number,
    website = null,
    updated_by = 'AUTO'
  } = client;

  return sql.query(
    `UPDATE client_master SET
      client_name = $1, contact_person = $2, email = $3, phone_number = $4,
      alternate_phone = $5, address = $6, city = $7, state = $8, country = $9,
      pin_code = $10, gst_number = $11, pan_number = $12, website = $13, updated_by = $14
    WHERE client_id = $15 RETURNING *`,
    [
      name, contact_person, email, phone, alternate_phone, address,
      city, state, country, pin_code, gst_number, pan_number,
      website, updated_by, id
    ]
  );
};

// Delete a client by ID
export const deleteClientById = async (id: number): Promise<{ rows: ClientRow[] }> => {
  return sql.query('DELETE FROM client_master WHERE client_id = $1 RETURNING *', [id]);
};
