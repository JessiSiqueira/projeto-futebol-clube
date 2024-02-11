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
  goalsBalance: 0,
  efficiency: 0,
});

const pointsCalculator = (team: ILeaderBoard, match: MatchTeamName): ILeaderBoard => {
  const teamUp = { ...team };

  teamUp.totalGames += 1;
  teamUp.goalsFavor += match.homeTeamGoals;
  teamUp.goalsOwn += match.awayTeamGoals;
  teamUp.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;

  if (match.homeTeamGoals > match.awayTeamGoals) {
    teamUp.totalPoints += 3;
    teamUp.totalVictories += 1;
  } else if (match.homeTeamGoals === match.awayTeamGoals) {
    teamUp.totalPoints += 1;
    teamUp.totalDraws += 1;
  } else {
    teamUp.totalLosses += 1;
  }
  return teamUp;
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
  });

  const leaderBoardArray: ILeaderBoard[] = Object.values(stats);

  return leaderBoardArray;
};

export default leaderBoard;
