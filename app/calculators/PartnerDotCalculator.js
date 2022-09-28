class PartnerDotCalculator {
  course;

  score1;

  score2;

  score3;

  score4;

  roundType;

  match;

  constructor(score1, score2, score3, score4) {
    this.score1 = score1;
    this.score2 = score2;
    this.score3 = score3;
    this.score4 = score4;
    this.validateCourse();
  }

  validateCourse() {
    const a = [this.score2, this.score3, this.score4];
    const v = a.every(s => s.courseName === this.score1.courseName);
    if (v) {
      this.course = this.score1.course;
    }
  }

  convertRound() {
    const ret = [];
    this.course.forEach(h => {
      ret.push(
        this.processHole(
          h,
          this.score1.score[h.hole],
          this.score2.score[h.hole],
          this.score3.score[h.hole],
          this.score4.score[h.hole],
        ),
      );
    });
    return ret;
  }

  processHole(hole, p1Score, p2Score, p3Score, p4Score) {
    return {
      hole: hole.hole,
      par: hole.par,
      handicap: hole.handicap,
      p1Score,
      p2Score,
      p3Score,
      p4Score,
    };
  }

  calculateLow(hole, previousHole) {
    const h = {
      ...hole,
    };
    const team1 = [hole.p1Score, hole.p2Score];
    const team2 = [hole.p3Score, hole.p4Score];
    const lowTeam1 = Math.min(...team1);
    const lowTeam2 = Math.min(...team2);
    let birdie = 0;
    const prevCarryOver =
      previousHole && previousHole.carryOverLow ? previousHole.carryOverLow : 0;
    if (lowTeam1 === lowTeam2) {
      h.lowTeam1 = 0;
      h.lowTeam2 = 0;
      h.carryOverLow = 1 + prevCarryOver;
    } else if (lowTeam1 < lowTeam2) {
      birdie = hole.par > lowTeam1 ? hole.par - lowTeam1 : 0;
      h.lowTeam1 = 1 + prevCarryOver + birdie;
      h.lowTeam2 = 0;
      h.carryOverLow = 0;
    } else {
      birdie = hole.par > lowTeam2 ? hole.par - lowTeam2 : 0;
      h.lowTeam2 = 1 + prevCarryOver + birdie;
      h.lowTeam1 = 0;
      h.carryOverLow = 0;
    }
    return h;
  }

  calculateLowTotal(hole, previousHole) {
    const h = {
      ...hole,
    };
    const team1 = [hole.p1Score, hole.p2Score];
    const team2 = [hole.p3Score, hole.p4Score];
    const lowTotalTeam1 = team1.reduce((p, c) => p + c, 0);
    const lowTotalTeam2 = team2.reduce((p, c) => p + c, 0);
    const prevCarryOver =
      previousHole && previousHole.carryOverTotal
        ? previousHole.carryOverTotal
        : 0;
    if (lowTotalTeam1 === lowTotalTeam2) {
      h.lowTotalTeam1 = 0;
      h.lowTotalTeam2 = 0;
      h.carryOverTotal = 1 + prevCarryOver;
    } else if (lowTotalTeam1 < lowTotalTeam2) {
      h.lowTotalTeam1 = 1 + prevCarryOver;
      h.lowTotalTeam2 = 0;
      h.carryOverTotal = 0;
    } else {
      h.lowTotalTeam2 = 1 + prevCarryOver;
      h.lowTotalTeam1 = 0;
      h.carryOverTotal = 0;
    }
    return h;
  }

  createMatch() {
    const round = this.convertRound();
    const ret = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < round.length; i++) {
      let currentHole = round[i];
      let previousHole = {};
      if (i > 0) {
        previousHole = ret[i - 1];
      }
      currentHole = this.calculateLow(currentHole, previousHole);
      currentHole = this.calculateLowTotal(currentHole, previousHole);
      ret[i] = currentHole;
    }
    return ret;
  }
}

export default PartnerDotCalculator;
