import { ILeaderBoard } from '../Interfaces/ILeaderBoard';

const classificationOfTeam = (classification: ILeaderBoard[]): ILeaderBoard[] => {
  const sort = classification.sort((x, y) => {
    if (x.totalPoints !== y.totalPoints) {
      return x.totalPoints - y.totalPoints;
    }

    if (x.totalVictories !== y.totalVictories) {
      return x.totalVictories - y.totalVictories;
    }

    if (x.goalsBalance !== y.goalsBalance) {
      return x.goalsBalance - y.goalsBalance;
    }

    if (x.goalsFavor !== y.goalsFavor) {
      return x.goalsFavor - y.goalsFavor;
    }

    return 0;
  });

  return sort;
};

export default classificationOfTeam;
