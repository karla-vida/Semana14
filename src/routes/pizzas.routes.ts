import { Router } from "express";
import { findAll, create, destroy } from "../api/controller/pizza.controller";

const pizzasRoutes = Router();

pizzasRoutes.get("/pizzas", findAll);

pizzasRoutes.post("/pizzas", create);

pizzasRoutes.delete("/pizzas/:id", destroy);

export default pizzasRoutes;
