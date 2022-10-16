export interface QueryParamsFindMyPizzas {
  name?: string
}
export interface Pizza {
  id: string;
  name: string;
  description: string;
  url: string;
  price: number;
  ingredients: string;
}

export interface RouteParamsPizza {
  id: string;
}


export interface BodyParamsCreatePizza {
  name: string,
  url: string,
  description: string,
  price: number,
  ingredients: string[]
}

export interface BodyUpdatePizza {
  name?: string,
  url?: string,
  description?: string,
  price?: number,
  ingredients?: string
}