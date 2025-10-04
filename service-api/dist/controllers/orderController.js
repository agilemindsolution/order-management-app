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
exports.deleteOrderHandler = exports.updateOrderHandler = exports.getOrderByIdHandler = exports.getOrdersHandler = exports.createOrderHandler = void 0;
const orderModel_1 = require("../models/orderModel");
const createOrderHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield (0, orderModel_1.createOrder)(req.body);
        res.status(201).json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.createOrderHandler = createOrderHandler;
const getOrdersHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, orderModel_1.getOrders)();
        res.status(200).json(orders);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrdersHandler = getOrdersHandler;
const getOrderByIdHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield (0, orderModel_1.getOrderById)(req.params.id);
        res.status(200).json(order);
    }
    catch (error) {
        next(error);
    }
});
exports.getOrderByIdHandler = getOrderByIdHandler;
const updateOrderHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield (0, orderModel_1.updateOrderById)(req.params.id, req.body);
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        next(error);
    }
});
exports.updateOrderHandler = updateOrderHandler;
const deleteOrderHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, orderModel_1.deleteOrderById)(req.params.id);
        res.status(204).end();
    }
    catch (error) {
        next(error);
    }
});
exports.deleteOrderHandler = deleteOrderHandler;
