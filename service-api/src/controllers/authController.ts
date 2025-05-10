// import bcrypt from 'bcrypt';
// // import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { createFactory, getFactoryByName } from '../models/factoryModel.js';
// import {
//   findUserByEmail,
//   createUser,
// } from '../models/userModel.js';

// export const registerAdmin = async (req, res) => {
//   const { name, email, password, factoryName } = req.body;

//   try {
//     const existingUser = await findUserByEmail(email);
//     if (existingUser) return res.status(400).json({ message: 'Email already exists' });

//     const existingFactory = await getFactoryByName(factoryName);
//     if (existingFactory) return res.status(400).json({ message: 'Factory already exists' });

//     const factory = await createFactory(factoryName);
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await createUser({
//       name,
//       email,
//       hashedPassword,
//       role: 'admin',
//       factoryId: factory.id
//     });

//     const token = jwt.sign({ userId: user.id, role: user.role, factoryId: user.factory_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.status(201).json({ token, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const register = async (req, res) => {
//   const { name, email, password, factoryId } = req.body;
//   try {
//     const existingUser = await findUserByEmail(email);
//     if (existingUser) return res.status(400).json({ message: 'Email already in use' });

//     const hashedPassword = await bcrypt.hash(password, 10);    
//     await createUser({ name, email, hashedPassword,  role: 'admin', factoryId });

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await findUserByEmail(email);
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await findUserByEmail(email);
//     if (!user) return res.status(400).json({ message: 'User not found' });

//     // Here you would send an email in production
//     res.json({ message: 'Reset link sent (simulated).' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// ts file
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { createFactory, getFactoryByName } from '../models/factoryModel';
import { findUserByEmail, createUser } from '../models/userModel';
import createError from 'http-errors';

// Utility function to generate JWT tokens
const generateToken = (userId: number, role: string, factoryId?: number) => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  const expiresIn: any = process.env.JWT_EXPIRES_IN || '1d';
  const payload = { userId, role, factoryId };
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, secret, options);
};

// Admin Registration
export const registerAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, factoryName } = req.body;

    if (!name || !email || !password || !factoryName) {
      return next(createError(400, 'All fields are required'));
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) return next(createError(409, 'Email already exists'));

    const existingFactory = await getFactoryByName(factoryName);
    if (existingFactory) return next(createError(409, 'Factory already exists'));

    const factory = await createFactory(factoryName);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      name,
      email,
      hashedPassword,
      role: 'admin',
      factoryId: factory.id,
    });

    const token = generateToken(user.user_id, user.role, user.factory_id);
    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Error in registerAdmin:', error);
    next(createError(500, 'Server error during admin registration'));
  }
};

// User Registration
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, factoryId } = req.body;

    if (!name || !email || !password || !factoryId) {
      return next(createError(400, 'All fields are required'));
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) return next(createError(409, 'Email already in use'));

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({
      name,
      email,
      hashedPassword,
      role: 'user',
      factoryId,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in register:', error);
    next(createError(500, 'Server error during user registration'));
  }
};

// User Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, 'Email and Password are required'));
    }

    const user = await findUserByEmail(email);
    if (!user) return next(createError(401, 'Invalid credentials'));

    const match = await bcrypt.compare(password, user.password);
    if (!match) return next(createError(401, 'Invalid credentials'));

    const token = generateToken(user.user_id, user.role, user.factory_id);
    res.json({ token, user: { id: user.user_id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('Error in login:', error);
    next(createError(500, 'Server error during login'));
  }
};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(createError(400, 'Email is required'));
    }

    const user = await findUserByEmail(email);
    if (!user) return next(createError(404, 'User not found'));

    // Placeholder for email sending logic
    res.json({ message: 'Password reset link sent (simulated)' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    next(createError(500, 'Server error during password reset'));
  }
};
