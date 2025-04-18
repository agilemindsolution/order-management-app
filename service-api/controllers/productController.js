import sql from '../config/db.js';
const getProducts = async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const result = await sql.query('INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *', [name, price]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getProducts, addProduct };