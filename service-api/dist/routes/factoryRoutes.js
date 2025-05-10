"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const factoryController_1 = require("../controllers/factoryController");
const router = (0, express_1.Router)();
router.get('/factories', factoryController_1.getFactories);
exports.default = router;
