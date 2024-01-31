import Team from '../model/ModelTeam';
import { TeamInterface } from '../Interfaces/TeamInterface';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  private team: Team;

  constructor() {
    this.team = new Team();
  }

  public async getAllTeams(): Promise<ServiceResponse<TeamInterface[]>> {
    const allTeams = await this.team.findAll();
    return {
      status: 'SUCCESSFUL',
      data: allTeams,
    };
  }

  public async getOneTeam(id: number): Promise<ServiceResponse<TeamInterface>> {
    const team = await this.team.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return {
      status: 'SUCCESSFUL',
      data: team,
    };
  }
}
