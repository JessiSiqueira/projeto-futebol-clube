import { Router, Request, Response } from 'express';

const loginRouter = Router();

loginRouter.post(
  '/',
  (req: Request, res: Response) => loginController.login(req, res),
);
