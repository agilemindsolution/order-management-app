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
exports.getRecentOrders = exports.getOrderStatusSummary = exports.getDashboardMetrics = void 0;
const dashboardModel_1 = require("../models/dashboardModel");
const getDashboardMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dashboardModel_1.getDashboardCounts)();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getDashboardMetrics = getDashboardMetrics;
const getOrderStatusSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dashboardModel_1.getOrderStatusCounts)();
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getOrderStatusSummary = getOrderStatusSummary;
const getRecentOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, dashboardModel_1.getRecentOrdersData)();
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getRecentOrders = getRecentOrders;
