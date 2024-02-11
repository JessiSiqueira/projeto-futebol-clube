import { ILeaderBoard } from '../Interfaces/ILeaderBoard';

const classificationOfTeam = (classification: ILeaderBoard[]): ILeaderBoard[] => {
  const sort = classification.sort((x, y) => {
    if (x.totalPoints !== y.totalPoints) {
      return y.totalPoints - x.totalPoints;
    }

    if (x.totalVictories !== y.totalVictories) {
      return y.totalVictories - x.totalVictories;
    }

    if (x.goalsBalance !== y.goalsBalance) {
      return y.goalsBalance - x.goalsBalance;
    }

    if (x.goalsFavor !== y.goalsFavor) {
      return y.goalsFavor - x.goalsFavor;
    }

    return 0;
  });

  return sort;
};

export default classificationOfTeam;
