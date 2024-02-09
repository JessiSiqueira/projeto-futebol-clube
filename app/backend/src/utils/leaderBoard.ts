import { MatchTeamName } from '../Interfaces/IMatches';
import { ILeaderBoard } from '../Interfaces/ILeaderBoard';

type Team = 'homeTeam' | 'awayTeam';

const teamTable = (team: string): ILeaderBoard => ({
  name: team,
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
});

const pointsCalculator = (team: ILeaderBoard, match: MatchTeamName): ILeaderBoard => {
  const updatedTeam = { ...team };

  if (match.homeTeamGoals > match.awayTeamGoals) {
    updatedTeam.totalPoints += 3;
    updatedTeam.totalVictories += 1;
  } else if (match.homeTeamGoals === match.awayTeamGoals) {
    updatedTeam.totalPoints += 1;
    updatedTeam.totalDraws += 1;
  } else {
    updatedTeam.totalLosses += 1;
  }
  return updatedTeam;
};

const leaderBoard = (
  matches: MatchTeamName[],
  teamT: Team,
): ILeaderBoard[] => {
  const stats: Record<string, ILeaderBoard> = {};

  matches.forEach((match) => {
    if (match.inProgress) return;
    const team = match[teamT].teamName;

    if (!stats[team]) {
      stats[team] = teamTable(team);
    }

    const updatedTeam = pointsCalculator(stats[team], match);

    stats[team] = updatedTeam;

    stats[team].totalGames += 1;
    stats[team].goalsFavor += match.homeTeamGoals;
    stats[team].goalsOwn += match.awayTeamGoals;
  });

  const leaderBoardArray: ILeaderBoard[] = Object.values(stats);

  return leaderBoardArray;
};

export default leaderBoard;
