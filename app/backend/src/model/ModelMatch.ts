import { IMatch } from '../Interfaces/IMatches';
import { IMatchModel } from '../Interfaces/IMatchModel';
import ModelMatch from '../database/models/Match.model';

export default class Match implements IMatchModel {
  private model = ModelMatch;
  async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll();
    return matches;
  }
}
