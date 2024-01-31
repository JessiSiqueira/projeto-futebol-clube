import { TeamInterface } from '../Interfaces/TeamInterface';
import { ITeamModel } from '../Interfaces/ITeamModel';
import ModelTeam from '../database/models/Team.model';

export default class Team implements ITeamModel {
  private model = ModelTeam;
  async findAll(): Promise<TeamInterface[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}
