import { IMatch, MatchTeamName } from '../Interfaces/IMatches';
import { NewEntity } from '../Interfaces/Index';
import { IMatchModel, updateMatch } from '../Interfaces/IMatchModel';
import ModelMatch from '../database/models/Match.model';
import ModelTeam from '../database/models/Team.model';

export default class Match implements IMatchModel {
  private model = ModelMatch;
  async findAll(): Promise<MatchTeamName[]> {
    const matches = await this.model.findAll({
      include: [
        {
          association: 'homeTeam',
          model: ModelTeam,
          attributes: ['teamName'],
        },
        {
          association: 'awayTeam',
          model: ModelTeam,
          attributes: ['teamName'],
        },
      ],
    }) as unknown as MatchTeamName[];
    return matches;
  }

  async findById(id: string): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);
    return match;
  }

  async update(id: string, data: updateMatch): Promise<IMatch | null> {
    const match = await this.model.update(data, { where: { id } });
    if (!match) return null;
    const updatedMatch = await this.model.findByPk(id);
    return updatedMatch;
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const match = await this.model.create(data);
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = match;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
