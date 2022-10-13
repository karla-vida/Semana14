import { Solicitation } from './../../types/solicitation.types';
import { v4 as uuidv4 } from "uuid";
import {Request, Response} from 'express';


let solicitations: Solicitation[]= [];

export function findAll(request: Request, response: Response) {
  response.json(solicitations);
}

export function find(request: Request, response: Response) {
  const { idPedido } = request.params;
  const solicitationsDetails = solicitations.find(
    (solicitation) => solicitation.id === idPedido
  );
  return response.json(solicitationsDetails);
}

export function create(request: Request, response: Response) {
  const {
    name_client,
    document_client,
    contact_client,
    address_client,
    payment_method,
    observations,
    pizzas,
  }  = request.body;

  const solicitation1 : Solicitation = {
    id: uuidv4(),
    name_client: request.body.name_client,
    document_client: request.body.document_client,
    contact_client: request.body.contact_client,
    address_client: request.body.address_client,
    payment_method: request.body.payment_method,
    observations: request.body.observations,
    pizzas: request.body.pizzas,
    order: "Em produção",
  }

    solicitations = [...solicitations, solicitation1]
    response.status(201).json(solicitation1)
}

export function destroy(request: Request, response: Response) {
  const solicitationsFiltered = solicitations.filter(
    (solicitation) => solicitation.id !== request.params.id
  );
  solicitations = [...solicitationsFiltered];
  response.json();
}
