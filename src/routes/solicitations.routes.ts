import { Router } from "express";
import {
  findAll,
  find,
  create,
  destroy,
} from "../api/controller/solicitation.controller";

const solicitationsRoutes = Router();

solicitationsRoutes.get("/solicitations", findAll);

solicitationsRoutes.get("/solicitations/:idPedido", find);

solicitationsRoutes.post("/solicitations", create);

solicitationsRoutes.delete("/solicitations/:id", destroy);

export default solicitationsRoutes;
