import { NextFunction, Request, Response } from 'express';
import Team from '../model/ModelTeam';

export default class ValidateMatch {
  static async validateTeams(homeTeamId: number, awayTeamId: number): Promise<boolean> {
    const teamModel = new Team();
    const foundHomeTeam = await teamModel.findById(homeTeamId);
    const foundAwayTeam = await teamModel.findById(awayTeamId);
    if (!foundAwayTeam || !foundHomeTeam) return false;
    return true;
  }

  static async validate(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    if (!(await ValidateMatch.validateTeams(homeTeamId, awayTeamId))) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }
}
