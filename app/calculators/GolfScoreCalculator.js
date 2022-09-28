class GolfScoreCalculator {
  total;

  outTotal;

  inTotal;

  constructor(scores) {
    this.scores = scores;
    this.outTotal = 0;
    this.inTotal = 0;
    this.total = 0;
    this.calculateOut();
    this.calculateIn();
    this.calculateTotal();
  }

  get outTotal() {
    return this.outTotal;
  }

  get inTotal() {
    return this.inTotal;
  }

  get total() {
    return this.total;
  }

  calculateOut() {
    const outHoles = Object.keys(this.scores).filter(s => s <= 9);
    if (outHoles) {
      this.outTotal = outHoles
        .map(h => this.scores[h])
        .reduce((previousValue, currentValue) => {
          const sum = previousValue + currentValue;
          return sum;
        }, 0);
    }
  }

  calculateIn() {
    const holes = Object.keys(this.scores).filter(s => s > 9);
    if (holes) {
      this.inTotal = holes
        .map(h => this.scores[h])
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0,
        );
    }
  }

  calculateTotal() {
    this.total = this.outTotal + this.inTotal;
  }
}

export default GolfScoreCalculator;
