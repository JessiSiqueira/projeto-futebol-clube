import { TeamInterface } from './TeamInterface';

export interface ITeamModel {
  // ...
  findAll(): Promise<TeamInterface[]>,
  findById(id: TeamInterface['id']): Promise<TeamInterface | null>
}
