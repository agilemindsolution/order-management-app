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
exports.getAllFactories = exports.getFactoryByName = exports.createFactory = void 0;
const db_1 = __importDefault(require("../config/db"));
const createFactory = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('INSERT INTO factories (name) VALUES ($1) RETURNING *', [name]);
    return result.rows[0];
});
exports.createFactory = createFactory;
const getFactoryByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT * FROM factories WHERE name = $1', [name]);
    return result.rows[0];
});
exports.getFactoryByName = getFactoryByName;
const getAllFactories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query('SELECT id, name FROM factories ORDER BY name ASC');
    return result.rows;
});
exports.getAllFactories = getAllFactories;
