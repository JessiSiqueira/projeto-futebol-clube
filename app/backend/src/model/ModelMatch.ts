import { IMatch } from '../Interfaces/IMatches';
import { IMatchModel } from '../Interfaces/IMatchModel';
import ModelMatch from '../database/models/Match.model';
import ModelTeam from '../database/models/Team.model';

export default class Match implements IMatchModel {
  private model = ModelMatch;
  async findAll(): Promise<IMatch[]> {
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
    });
    return matches;
  }
}
