import { Router } from "express";
import {
  findMany,
  find,
  create,
  destroy,
  updateStatus,
  updateStatusFinalizado
} from "../api/controller/solicitation.controller";

const solicitationsRoutes = Router();

solicitationsRoutes.get("/solicitations", findMany);
solicitationsRoutes.get("/solicitations/:id", find);
solicitationsRoutes.post("/solicitations", create);
solicitationsRoutes.delete("/solicitations/:id", destroy);
solicitationsRoutes.patch('/solicitations/status/:id', updateStatus)
solicitationsRoutes.patch('/solicitations/statusFinalizado/:id', updateStatusFinalizado)
export default solicitationsRoutes;
