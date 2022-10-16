import { Solicitation, RouteParamsSolicitation, QueryParamsFindMySolicitations } from "./../../types/solicitation.types";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { readFileJson } from '../../utils/readFileJson'
import { getSolicitationsInFile } from "../../utils/getSolicitations";
import fs, { write } from 'fs'

export function findMany(request: Request<{}, {}, {}, QueryParamsFindMySolicitations>, response: Response) {
  const solicitations = getSolicitationsInFile()
  response.json(solicitations)
}

export function find(request: Request, response: Response) {
  const { id } = request.params
  const solicitations: Solicitation[] = readFileJson('solicitations.json')

  const solicitation = solicitations.find(solicitation => solicitation.id === id)

  return response.json(solicitation)
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
  } = request.body;

  const solicitation = {
    id: uuidv4(),
    name_client: request.body.name_client,
    document_client: request.body.document_client,
    contact_client: request.body.contact_client,
    address_client: request.body.address_client,
    payment_method: request.body.payment_method,
    observations: request.body.observations,
    pizzas: request.body.pizzas,
    order: "Em produção",
  };
  
  const solicitations = getSolicitationsInFile()

  fs.writeFileSync('solicitations.json', JSON.stringify([...solicitations, solicitation]))

  response.status(201).json(solicitation)
}


export function destroy(request: Request<RouteParamsSolicitation>, response: Response) {
  const solicitationInFileJson: Solicitation[] = getSolicitationsInFile()

  const solicitation = solicitationInFileJson.filter(solicitation => solicitation.id !== request.params.id)

  fs.writeFileSync('solicitation.json', JSON.stringify(solicitation))

  response.json()
}

export function updateStatus(request: Request, response: Response) {
  const solicitations: Solicitation[] = getSolicitationsInFile()

 const updatedSolicitations = solicitations.map(solicitation => {
    if (solicitation.id === request.params.id) {
      solicitation.order = 'A CAMINHO'
    }
    return solicitation
  })

  fs.writeFileSync('solicitations.json', JSON.stringify(updatedSolicitations))

  return response.json()

}

export function updateStatusFinalizado(request: Request, response: Response) {
  const solicitations: Solicitation[] = getSolicitationsInFile()

 const updatedSolicitations = solicitations.map(solicitation => {
    if (solicitation.id === request.params.id) {
      solicitation.order = 'FINALIZADO'
    }
    return solicitation
  })

  fs.writeFileSync('solicitations.json', JSON.stringify(updatedSolicitations))

  return response.json()

}