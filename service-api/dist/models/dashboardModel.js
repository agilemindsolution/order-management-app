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
exports.getRecentOrdersData = exports.getOrderStatusCounts = exports.getDashboardCounts = void 0;
const db_1 = __importDefault(require("../config/db"));
const getDashboardCounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const [orders, clients, products, revenue] = yield Promise.all([
        db_1.default.query('SELECT COUNT(*) FROM orders'),
        db_1.default.query('SELECT COUNT(*) FROM client_master'),
        db_1.default.query('SELECT COUNT(*) FROM product_master'),
        db_1.default.query('SELECT COALESCE(SUM(total_amount), 0) FROM orders')
    ]);
    return {
        orderCount: parseInt(orders.rows[0].count, 10),
        clientCount: parseInt(clients.rows[0].count, 10),
        productCount: parseInt(products.rows[0].count, 10),
        totalRevenue: parseFloat(revenue.rows[0].coalesce)
    };
});
exports.getDashboardCounts = getDashboardCounts;
const getOrderStatusCounts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.default.query(`
    SELECT shipping_status, COUNT(*) as count
    FROM orders
    GROUP BY shipping_status;`);
    const statusCounts = {
        pending: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
    };
    result.rows.forEach((row) => {
        statusCounts[row.shipping_status] = parseInt(row.count, 10);
    });
    return statusCounts;
});
exports.getOrderStatusCounts = getOrderStatusCounts;
const getRecentOrdersData = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.default.query(`
    SELECT o.order_id, cm.client_name, o.shipping_status, o.total_amount, o.created_at
    FROM orders o 
    left join client_master cm on cm.client_id =o.client_id
    ORDER BY o.created_at DESC
    LIMIT 5;`);
});
exports.getRecentOrdersData = getRecentOrdersData;
