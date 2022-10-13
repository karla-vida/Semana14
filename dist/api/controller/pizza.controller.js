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
exports.destroy = exports.create = exports.findAll = void 0;
const uuid_1 = require("uuid");
const createPizza_schema_1 = require("../../validations/createPizza.schema");
let pizzas = [];
function findAll(request, response) {
    const nameQuery = request.query.name || "";
    const pizzasFiltered = pizzas.filter((pizza) => pizza.name.toLowerCase().includes(nameQuery.toString().toLowerCase()));
    if (pizzasFiltered.length === 0) {
        return response.status(401).json({ error: "Pizza não encontrada" });
    }
    response.status(200).json(pizzasFiltered);
}
exports.findAll = findAll;
function create(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield createPizza_schema_1.createPizzaSchema.validate(request.body);
            const { name, description, price, url, ingredients } = request.body;
            const pizzaExists = pizzas.find((pizza) => pizza.name === name);
            if (pizzaExists) {
                return response
                    .status(401)
                    .json({ error: "Pizza já encontra-se cadastrada" });
            }
            const pizza = {
                id: (0, uuid_1.v4)(),
                name,
                url,
                description,
                price,
                ingredients,
            };
            pizzas.push(pizza);
            response.status(201).json(pizza);
        }
        catch (error) {
            response.status(400).json({ error: "Erro na criação" });
        }
    });
}
exports.create = create;
function destroy(request, response) {
    const pizzasFiltered = pizzas.filter((pizza) => pizza.id !== request.params.id);
    pizzas = [...pizzasFiltered];
    return response.json();
}
exports.destroy = destroy;
