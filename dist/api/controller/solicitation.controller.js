"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.create = exports.find = exports.findAll = void 0;
const uuid_1 = require("uuid");
let solicitations = [];
function findAll(request, response) {
    response.json(solicitations);
}
exports.findAll = findAll;
function find(request, response) {
    const { idPedido } = request.params;
    const solicitationsDetails = solicitations.find((solicitation) => solicitation.id === idPedido);
    return response.json(solicitationsDetails);
}
exports.find = find;
function create(request, response) {
    const { name_client, document_client, contact_client, address_client, payment_method, observations, pizzas, } = request.body;
    const solicitation = {
        id: (0, uuid_1.v4)(),
        name_client,
        document_client,
        contact_client,
        address_client,
        payment_method,
        observations,
        pizzas,
        order: "EM PRODUÇÃO",
    };
    let solicitation1 = request.body;
    solicitations.push(solicitation1);
    response.status(201).json(solicitation1);
}
exports.create = create;
function destroy(request, response) {
    const solicitationsFiltered = solicitations.filter((solicitation) => solicitation.id !== request.params.id);
    solicitations = [...solicitationsFiltered];
    response.json();
}
exports.destroy = destroy;
