import { v4 as uuidv4 } from "uuid";
import {Request, Response} from 'express';
import { Pizza, BodyParamsCreatePizza, QueryParamsFindMyPizzas, RouteParamsPizza, BodyUpdatePizza } from "../../types/pizza.types"
import fs from 'fs';
import { getPizzasInFile } from '../../utils/getPizzasFile'
import { readFileJson } from '../../utils/readFileJson'

export function findMany(request: Request<{}, {}, {}, QueryParamsFindMyPizzas>, response: Response) {
  const nameQuery = request.query.name || ""
  
  const pizzas: Pizza[] = readFileJson('pizzas.json')

  const pizzasFiltered = pizzas.filter(pizza => pizza.name.toLowerCase().includes(nameQuery.toLowerCase()))

  response.json(pizzasFiltered)
}


export function create(request: Request<{}, {}, BodyParamsCreatePizza>, response: Response) {
  
  const { name, description, price, url, ingredients } = request.body

  const pizzas: Pizza[] = getPizzasInFile()

  const pizzaExists = pizzas.find(pizza => pizza.name === name)

  if (pizzaExists) {
    return response.status(401).json({ error: 'Pizza já encontra-se cadastrada' })
  }

  const pizza = {
    id: uuidv4(),
    name,
    url,
    description,
    price,
    ingredients
  }

  fs.writeFileSync('pizzas.json', JSON.stringify([...pizzas, pizza]))

  response.status(201).json(pizza)
}

export function destroy(request: Request<RouteParamsPizza>, response: Response) {
  const pizzasInFileJson: Pizza[] = getPizzasInFile()

  const pizzas = pizzasInFileJson.filter(pizza => pizza.id !== request.params.id)

  fs.writeFileSync('pizzas.json', JSON.stringify(pizzas))

  response.json()
}

export function update(request: Request<RouteParamsPizza, {}, BodyUpdatePizza>, response: Response) {
  const pizzasInFileJson: Pizza[] = getPizzasInFile()

  const updatedPizzas= pizzasInFileJson.map(pizza => {
    if (pizza.id === request.params.id) {
      pizza.name = request.body.name || pizza.name
      pizza.url = request.body.url || pizza.url
      pizza.description = request.body.description || pizza.description
      pizza.price = request.body.price || pizza.price
      pizza.ingredients = request.body.ingredients || pizza.ingredients
    }
    return pizza
  })

  fs.writeFileSync('pizzas.json', JSON.stringify(updatedPizzas))

  return response.json()

}