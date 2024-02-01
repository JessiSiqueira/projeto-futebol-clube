import { Router, Request, Response } from 'express';
import Validations from '../middlewares/validationLogin';
import UserController from '../controller/UserController';

const userController = new UserController();

const loginRouter = Router();

loginRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

export default loginRouter;
