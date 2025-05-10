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
exports.deleteClientById = exports.updateClientById = exports.insertClient = exports.getClientById = exports.getAllClients = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllClients = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.query('SELECT * FROM client_master');
});
exports.getAllClients = getAllClients;
const getClientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.query('SELECT * FROM client_master WHERE client_id = $1', [id]);
});
exports.getClientById = getClientById;
const insertClient = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, contact_person, email, phone, alternate_phone = null, address, city, state, country, pin_code, gst_number, pan_number, website = null, created_by = 'AUTO', updated_by = 'AUTO' } = client;
    return db_1.default.query(`INSERT INTO client_master (
      client_name, contact_person, email, phone_number, alternate_phone, 
      address, city, state, country, pin_code, gst_number, pan_number, 
      website, created_by, updated_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *`, [
        name, contact_person, email, phone, alternate_phone, address,
        city, state, country, pin_code, gst_number, pan_number,
        website, created_by, updated_by
    ]);
});
exports.insertClient = insertClient;
const updateClientById = (id, client) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, contact_person, email, phone, alternate_phone = null, address, city, state, country, pin_code, gst_number, pan_number, website = null, updated_by = 'AUTO' } = client;
    return db_1.default.query(`UPDATE client_master SET
      client_name = $1, contact_person = $2, email = $3, phone_number = $4,
      alternate_phone = $5, address = $6, city = $7, state = $8, country = $9,
      pin_code = $10, gst_number = $11, pan_number = $12, website = $13, updated_by = $14
    WHERE client_id = $15 RETURNING *`, [
        name, contact_person, email, phone, alternate_phone, address,
        city, state, country, pin_code, gst_number, pan_number,
        website, updated_by, id
    ]);
});
exports.updateClientById = updateClientById;
const deleteClientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.query('DELETE FROM client_master WHERE client_id = $1 RETURNING *', [id]);
});
exports.deleteClientById = deleteClientById;
