import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../service/teamService';

export default class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public async getAllTeams(req: Request, res: Response) {
    const { status, data } = await this.teamService.getAllTeams();
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getOneTeam(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.getOneTeam(Number(id));
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }

    res.status(mapStatusHTTP(status)).json(data);
  }
}
