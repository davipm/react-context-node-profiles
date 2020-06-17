import { Router } from "express";
import { searchDev } from "../controllers/SearchController";

const routes = Router();

routes.get("/search", searchDev);

export default routes;
