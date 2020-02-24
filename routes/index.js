import { Router } from 'express';
import NumberController from '../controllers/numberController.js';
const routes = Router();
routes.get('/', NumberController.getNumberInWords);
routes.get('/:number', NumberController.getNumberInWords);
export default routes;