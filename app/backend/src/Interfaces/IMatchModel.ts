import { IMatch } from './IMatches';

export interface IMatchModel {
  // ...
  findAll(): Promise<IMatch[]>,
}

export interface updateMatch {
  homeTeamId?: number,
  homeTeamGoals?: number,
  awayTeamId?: number,
  awayTeamGoals?: number,
  inProgress?: boolean,
}
