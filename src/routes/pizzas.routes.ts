import { Router } from "express";
import { create, destroy, findMany, update } from "../api/controller/pizza.controller";

const pizzasRoutes = Router();

pizzasRoutes.get("/pizzas", findMany);

pizzasRoutes.post("/pizzas", create);

pizzasRoutes.delete("/pizzas/:id", destroy);

pizzasRoutes.put("/pizzas/:id", update);

export default pizzasRoutes;
