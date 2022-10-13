// NODEMON -> gerenciar o seu projeto
import express from "express";
import cors from "cors";
import pizzasRoutes from "./routes/pizzas.routes";
import solicitationsRoutes from "./routes/solicitations.routes";
import { createPizzaSchema } from "./validations/createPizza.schema";

const app = express();

app.use(express.json());
app.use(cors())
app.use(pizzasRoutes);
app.use(solicitationsRoutes)
//app.use(createPizzaSchema)

export default app