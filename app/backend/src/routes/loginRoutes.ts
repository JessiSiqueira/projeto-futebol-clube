import { Router, Request, Response } from 'express';
import Validations from '../middlewares/validationLogin';
import UserController from '../controller/UserController';
import ValidateToken from '../middlewares/validateToken';

const userController = new UserController();

const loginRouter = Router();

loginRouter.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.login(req, res),
);

loginRouter.get(
  '/role',
  ValidateToken.validate,
  (req: Request, res: Response) => userController.getUserRole(req, res),
);

export default loginRouter;
