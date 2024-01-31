import { Router, Request, Response } from 'express';

import TeamController from '../controller/TeamController';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get(
  '/',
  (req: Request, res: Response) => teamController.getAllTeams(req, res),
);

export default teamRouter;
