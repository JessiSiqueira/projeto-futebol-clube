import { Router, Request, Response } from 'express';

import MatchController from '../controller/MatchController';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

export default matchRouter;
