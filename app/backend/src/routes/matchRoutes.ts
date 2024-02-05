import { Router, Request, Response } from 'express';

import MatchController from '../controller/MatchController';
import ValidateToken from '../middlewares/validateToken';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/',
  (req: Request, res: Response) => matchController.getAllMatches(req, res),
);

matchRouter.patch(
  '/:id/finish',
  ValidateToken.validate,
  (req: Request, res: Response) => matchController.updateFinishedMatch(req, res),
);

export default matchRouter;
