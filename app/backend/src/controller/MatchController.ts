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
    res.status(mapStatusHTTP(status)).json(data);
  }
}
