import { TeamInterface } from './TeamInterface';

export interface ITeamModel {
  // ...
  findAll(): Promise<TeamInterface[]>,
}
