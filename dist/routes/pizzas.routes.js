"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pizza_controller_1 = require("../api/controller/pizza.controller");
const pizzasRoutes = (0, express_1.Router)();
pizzasRoutes.get("/pizzas", pizza_controller_1.findAll);
pizzasRoutes.post("/pizzas", pizza_controller_1.create);
pizzasRoutes.delete("/pizzas/:id", pizza_controller_1.destroy);
exports.default = pizzasRoutes;
