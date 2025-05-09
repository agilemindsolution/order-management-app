import sql from '../config/db.js';
const getOrders = async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addOrder = async (req, res) => {
  try {
    const { client_id, product_id, quantity } = req.body;
    const result = await sql.query('INSERT INTO orders (client_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *', [client_id, product_id, quantity]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getOrders, addOrder };