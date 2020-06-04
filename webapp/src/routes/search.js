import { Router } from 'express';
import { index } from "../controllers/SearchController";

const routes = Router();

routes.get('/search', index);

export default routes;
