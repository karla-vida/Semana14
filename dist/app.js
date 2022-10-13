"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// NODEMON -> gerenciar o seu projeto
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pizzas_routes_1 = __importDefault(require("./routes/pizzas.routes"));
const solicitations_routes_1 = __importDefault(require("./routes/solicitations.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(pizzas_routes_1.default);
app.use(solicitations_routes_1.default);
//app.use(createPizzaSchema)
exports.default = app;
