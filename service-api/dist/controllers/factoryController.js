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
exports.getFactories = void 0;
const factoryModel_1 = require("../models/factoryModel");
const getFactories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const factories = yield (0, factoryModel_1.getAllFactories)();
        res.status(200).json(factories);
    }
    catch (error) {
        console.error('Error getting factories:', error);
        res.status(500).json({ message: 'Failed to retrieve factories' });
    }
});
exports.getFactories = getFactories;
