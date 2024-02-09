import { IdUser } from './IUser';

export interface IMatch extends IdUser {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface MatchTeamName extends IMatch {
  homeTeam: {
    teamName: string;
  },
  awayTeam: {
    teamName: string;
  }
}
