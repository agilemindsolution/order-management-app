import sql from '../config/db.js';

export const getAllClients = async () => {
  return sql.query('SELECT * FROM client_master');
};

export const getClientById = async (id) => {
  return sql.query('SELECT * FROM client_master WHERE client_id = $1', [id]);
};

export const insertClient = async (client) => {
  const {
    name,
    contact_person,
    email,
    phone,
    alternate_phone,
    address,
    city,
    state,
    country,
    pin_code,
    gst_number,
    pan_number,
    website,
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

export const updateClientById = async (id, client) => {
  const {
    name,
    contact_person,
    email,
    phone,
    alternate_phone,
    address,
    city,
    state,
    country,
    pin_code,
    gst_number,
    pan_number,
    website,
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

export const deleteClientById = async (id) => {
  return sql.query('DELETE FROM client_master WHERE client_id = $1 RETURNING *', [id]);
};