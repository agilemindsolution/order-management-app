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
exports.deleteOrderById = exports.updateOrderById = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const db_1 = __importDefault(require("../config/db"));
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.default.query('INSERT INTO orders (client_id, order_date, expected_delivery_date, shipping_date, courier_name, tracking_number, shipping_status, total_amount, payment_status, gst_number, pan_number, created_by, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *', [orderData.client_id, orderData.order_date, orderData.expected_delivery_date, orderData.shipping_date, orderData.courier_name, orderData.tracking_number, orderData.shipping_status, orderData.total_amount, orderData.payment_status, orderData.gst_number, orderData.pan_number, orderData.created_by, orderData.updated_by]);
    return rows[0];
});
exports.createOrder = createOrder;
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.default.query(`SELECT o.*, cm.client_name
      FROM orders o
      LEFT JOIN client_master cm ON o.client_id = cm.client_id;`);
    return rows;
});
exports.getOrders = getOrders;
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.default.query('SELECT * FROM orders WHERE order_id = $1', [id]);
    return rows[0];
});
exports.getOrderById = getOrderById;
const updateOrderById = (id, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = Object.keys(orderData).map((key, index) => `${key} = $${index + 2}`).join(', ');
    const values = Object.values(orderData);
    const { rows } = yield db_1.default.query(`UPDATE orders SET ${fields} WHERE order_id = $1 RETURNING *`, [id, ...values]);
    return rows[0];
});
exports.updateOrderById = updateOrderById;
const deleteOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.query('DELETE FROM orders WHERE order_id = $1', [id]);
});
exports.deleteOrderById = deleteOrderById;
