import { IMatch, MatchTeamName } from './IMatches';

export interface IMatchModel {
  // ...
  findAll(): Promise<MatchTeamName[]>,
  create(data: Partial<IMatch>): Promise<IMatch>,

}

export interface updateMatch {
  homeTeamId?: number,
  homeTeamGoals?: number,
  awayTeamId?: number,
  awayTeamGoals?: number,
  inProgress?: boolean,
}
