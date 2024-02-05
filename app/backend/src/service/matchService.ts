import Match from '../model/ModelMatch';
import { IMatch } from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  private match: Match;

  constructor() {
    this.match = new Match();
  }

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.match.findAll();
    return {
      status: 'SUCCESSFUL',
      data: allMatches,
    };
  }

  public async updateFinishedMatch(id: string):
  Promise<ServiceResponse<{ message: string }>> {
    await this.match.update(id, { inProgress: false });
    return {
      status: 'SUCCESSFUL',
      data: { message: 'Finished' },
    };
  }
}
