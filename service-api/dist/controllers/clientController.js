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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.addClient = exports.getSpecificClient = exports.getClients = void 0;
const clientModel_1 = require("../models/clientModel");
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, clientModel_1.getAllClients)();
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getClients = getClients;
const getSpecificClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client_id = req.params.id;
    try {
        const result = yield (0, clientModel_1.getClientById)(client_id);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getSpecificClient = getSpecificClient;
const addClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const insertData = req.body;
    try {
        const result = yield (0, clientModel_1.insertClient)(insertData);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addClient = addClient;
const updateClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client_id = req.params.id;
    const updateData = req.body;
    try {
        const result = yield (0, clientModel_1.updateClientById)(client_id, updateData);
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client_id = req.params.id;
    try {
        const result = yield (0, clientModel_1.deleteClientById)(client_id);
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteClient = deleteClient;
