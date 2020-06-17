import { Router } from "express";
import { createDev, getDevs } from "../controllers/DevController";

const routes = Router();

routes.get("/dev", getDevs);
routes.post("/dev", createDev);

export default routes;
