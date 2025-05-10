"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerRoutes;
const clientRoutes_1 = __importDefault(require("./clientRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
const orderRoutes_1 = __importDefault(require("./orderRoutes"));
const factoryRoutes_1 = __importDefault(require("./factoryRoutes"));
function registerRoutes(app) {
    app.use('/api', factoryRoutes_1.default);
    app.use('/api/clients', clientRoutes_1.default);
    app.use('/api/products', productRoutes_1.default);
    app.use('/api/orders', orderRoutes_1.default);
}
