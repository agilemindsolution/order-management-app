"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.login = exports.register = exports.registerAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const factoryModel_1 = require("../models/factoryModel");
const userModel_1 = require("../models/userModel");
const http_errors_1 = __importDefault(require("http-errors"));
const generateToken = (userId, role, factoryId) => {
    const secret = process.env.JWT_SECRET || 'default_secret';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
    const payload = { userId, role, factoryId };
    const options = { expiresIn };
    return jsonwebtoken_1.default.sign(payload, secret, options);
};
const registerAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, factoryName } = req.body;
        if (!name || !email || !password || !factoryName) {
            return next((0, http_errors_1.default)(400, 'All fields are required'));
        }
        const existingUser = yield (0, userModel_1.findUserByEmail)(email);
        if (existingUser)
            return next((0, http_errors_1.default)(409, 'Email already exists'));
        const existingFactory = yield (0, factoryModel_1.getFactoryByName)(factoryName);
        if (existingFactory)
            return next((0, http_errors_1.default)(409, 'Factory already exists'));
        const factory = yield (0, factoryModel_1.createFactory)(factoryName);
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield (0, userModel_1.createUser)({
            name,
            email,
            hashedPassword,
            role: 'admin',
            factoryId: factory.id,
        });
        const token = generateToken(user.user_id, user.role, user.factory_id);
        res.status(201).json({ token, user });
    }
    catch (error) {
        console.error('Error in registerAdmin:', error);
        next((0, http_errors_1.default)(500, 'Server error during admin registration'));
    }
});
exports.registerAdmin = registerAdmin;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, factoryId } = req.body;
        if (!name || !email || !password || !factoryId) {
            return next((0, http_errors_1.default)(400, 'All fields are required'));
        }
        const existingUser = yield (0, userModel_1.findUserByEmail)(email);
        if (existingUser)
            return next((0, http_errors_1.default)(409, 'Email already in use'));
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield (0, userModel_1.createUser)({
            name,
            email,
            hashedPassword,
            role: 'user',
            factoryId,
        });
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error in register:', error);
        next((0, http_errors_1.default)(500, 'Server error during user registration'));
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next((0, http_errors_1.default)(400, 'Email and Password are required'));
        }
        const user = yield (0, userModel_1.findUserByEmail)(email);
        if (!user)
            return next((0, http_errors_1.default)(401, 'Invalid credentials'));
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            return next((0, http_errors_1.default)(401, 'Invalid credentials'));
        const token = generateToken(user.user_id, user.role, user.factory_id);
        res.json({ token, user: { id: user.user_id, email: user.email, name: user.name } });
    }
    catch (error) {
        console.error('Error in login:', error);
        next((0, http_errors_1.default)(500, 'Server error during login'));
    }
});
exports.login = login;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return next((0, http_errors_1.default)(400, 'Email is required'));
        }
        const user = yield (0, userModel_1.findUserByEmail)(email);
        if (!user)
            return next((0, http_errors_1.default)(404, 'User not found'));
        res.json({ message: 'Password reset link sent (simulated)' });
    }
    catch (error) {
        console.error('Error in forgotPassword:', error);
        next((0, http_errors_1.default)(500, 'Server error during password reset'));
    }
});
exports.forgotPassword = forgotPassword;
