import { Router } from 'express';
import { index, store } from "../controllers/DevController";

const routes = Router();

routes.get('/dev', index);
routes.post('/dev', store);

export default routes;

