import { Router } from "express";
import { createDev, getDevs, deleteDev } from "../controllers/DevController";

const routes = Router();

routes.get("/dev", getDevs);
routes.post("/dev", createDev);
routes.delete("/dev/:id", deleteDev);

export default routes;
