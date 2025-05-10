import { Router } from 'express';
import { registerAdmin, register, login, forgotPassword } from '../controllers/authController';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import pool from '../config/db.js'; // PostgreSQL pool instance

const router = Router();

router.post('/register-admin', registerAdmin);
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

export default router;
