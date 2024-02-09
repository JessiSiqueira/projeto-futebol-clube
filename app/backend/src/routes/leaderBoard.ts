import { Router, Response, Request } from 'express';
import MatchController from '../controller/MatchController';

const controller = new MatchController();

const leaderBoard = Router();

leaderBoard.get(
  '/home',
  (req: Request, res: Response) => controller.getLeaderBoard(req, res),
);

export default leaderBoard;
