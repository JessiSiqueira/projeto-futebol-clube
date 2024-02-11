import { NewEntity } from '../Interfaces/Index';
import Match from '../model/ModelMatch';
import { IMatch } from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderBoard } from '../Interfaces/ILeaderBoard';
import leaderBoard from '../utils/leaderBoard';
import classificationOfTeam from '../utils/Classification';

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

  public async updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<{ message: string }>> {
    await this.match.update(id, { homeTeamGoals, awayTeamGoals });
    return {
      status: 'SUCCESSFUL',
      data: { message: 'GOAAAAL!' },
    };
  }

  public async createMatch(data: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const newMatch = { ...data, inProgress: true };
    const match = await this.match.create(newMatch);
    console.log('olha aqui', match);
    return {
      status: 'CREATED',
      data: match,
    };
  }

  public async getLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const allMatches = await this.match.findAll();
    const data = leaderBoard(allMatches, 'homeTeam');
    const efficiencyOfTeam = data.map((board) => {
      const obj = board;
      return {
        ...obj,
        efficiency:
          Number(((board.totalPoints / (board.totalGames * 3)) * 100).toFixed(2)),
      };
    });

    const classification = classificationOfTeam(efficiencyOfTeam);
    return {
      status: 'SUCCESSFUL',
      data: classification,
    };
  }
}
