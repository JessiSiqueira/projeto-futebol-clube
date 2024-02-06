import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../service/matchService';

export default class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public async getAllMatches(req: Request, res: Response) {
    const { status, data } = await this.matchService.getAllMatches();
    const { inProgress } = req.query;
    if (inProgress === 'true' && Array.isArray(data)) {
      const matchesInProgress = data.filter((match) => match.inProgress === true);
      return res.status(mapStatusHTTP(status)).json(matchesInProgress);
    }
    if (inProgress === 'false' && Array.isArray(data)) {
      const matchesFinished = data.filter((match) => match.inProgress === false);
      return res.status(mapStatusHTTP(status)).json(matchesFinished);
    }
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateFinishedMatch(req: Request, res: Response) {
    const { status, data } = await this.matchService.updateFinishedMatch(req.params.id);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService.updateMatch(id, homeTeamGoals, awayTeamGoals);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
