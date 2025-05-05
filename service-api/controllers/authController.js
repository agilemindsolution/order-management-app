import bcrypt from 'bcrypt';
// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createFactory, getFactoryByName } from '../models/factoryModel.js';
import {
  findUserByEmail,
  createUser,
} from '../models/userModel.js';

export const registerAdmin = async (req, res) => {
  const { name, email, password, factoryName } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const existingFactory = await getFactoryByName(factoryName);
    if (existingFactory) return res.status(400).json({ message: 'Factory already exists' });

    const factory = await createFactory(factoryName);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      hashedPassword,
      role: 'admin',
      factoryId: factory.id
    });

    const token = jwt.sign({ userId: user.id, role: user.role, factoryId: user.factory_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const register = async (req, res) => {
  const { name, email, password, factoryId } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);    
    await createUser({ name, email, hashedPassword,  role: 'admin', factoryId });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Here you would send an email in production
    res.json({ message: 'Reset link sent (simulated).' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
