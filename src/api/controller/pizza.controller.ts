import { v4 as uuidv4 } from "uuid";
import { createPizzaSchema } from "../../validations/createPizza.schema";
import {Request, Response} from 'express';
import { Pizza } from "../../types/pizza.types"

let pizzas: Pizza[]= [];

export function findAll(request: Request, response: Response) {


  const nameQuery = request.query.name || "";
  const pizzasFiltered =  pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(nameQuery.toString().toLowerCase())
  );
  if (pizzasFiltered.length === 0) {
    return response.status(401).json({ error: "Pizza não encontrada" });
  }
  response.status(200).json(pizzasFiltered);
}

export async function create(request: Request, response: Response) {
  try {
    await createPizzaSchema.validate(request.body);

    const { name, description, price, url, ingredients } = request.body;
    const pizzaExists = pizzas.find((pizza) => pizza.name === name);
    if (pizzaExists) {
      return response
        .status(401)
        .json({ error: "Pizza já encontra-se cadastrada" });
    }

    const pizza = {
      id: uuidv4(),
      name,
      url,
      description,
      price,
      ingredients,
    };

    pizzas.push(pizza);
    response.status(201).json(pizza);
  } catch (error) {
    response.status(400).json({ error: "Erro na criação" });
  }
}

export function destroy(request: Request, response: Response) {
  const pizzasFiltered = pizzas.filter(
    (pizza) => pizza.id !== request.params.id
  );
  pizzas = [...pizzasFiltered];

  return response.json();
}
