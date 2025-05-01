import sql from '../config/db.js';


const getClients = async (req, res) => {  
  try {
    const result = await sql.query('SELECT * FROM client_master');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM client_master');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addClient = async (req, res) => {  
  try {
    const { name, contact_person, email, phone, alternate_phone, address, city, state, country, pin_code, gst_number, pan_number, website } = req.body;
    const created_by = req.body?.created_by || 'AUTO'
    const updated_by = req.body?.updated_by || 'AUTO'
    const result = await sql.query(`INSERT INTO client_master (client_name, contact_person, email, phone_number, alternate_phone, address, city, state, country, pin_code, gst_number, pan_number, website, created_by, updated_by) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`, [name, contact_person, email, phone, alternate_phone, address, city, state, country, pin_code, gst_number, pan_number, website, created_by, updated_by]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateClient = async (req, res) => {  
  try {
    const { name, contact_person, email, phone, alternate_phone, address, city, state, country, pin_code, gst_number, pan_number, website } = req.body;
    const updated_by = req.body?.updated_by || 'AUTO';
    const client_id = req.body.id;
    const result = await sql.query(`UPDATE client_master 
      SET 
        client_name = $1,
        contact_person = $2,
        email = $3,
        phone_number = $4,
        alternate_phone = $5,
        address = $6,
        city = $7,
        state = $8,
        country = $9,
        pin_code = $10,
        gst_number = $11,
        pan_number = $12,
        website = $13,
        updated_by = $14
      WHERE client_id = $15
      RETURNING *;`, [
    name, contact_person, email, phone, alternate_phone, address, city, state, 
    country, pin_code, gst_number, pan_number, website, updated_by, client_id
]);    
      res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteClient = async (req, res) => {
  const client_id = req.params.id;
  console.log("Client id:", client_id);
  
  try {
    const result = await sql.query('DELETE FROM client_master where client_id=$1', [client_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getClients, getClientById, addClient, updateClient, deleteClient };