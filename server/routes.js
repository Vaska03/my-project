import { Router } from 'express';
import userController from './controllers/userController.js';
import bookController from './controllers/bookController.js';

const routes = Router();


routes.use('/users', userController);

routes.use('/books', bookController);

export default routes;
