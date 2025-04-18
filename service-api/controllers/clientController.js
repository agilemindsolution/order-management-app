import sql from '../config/db.js';


const getClients = async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM client_master');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addClient = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await sql.query('INSERT INTO clients (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getClients, addClient };