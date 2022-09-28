/**
 *
 * ScoreCard
 *
 */

import React from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Hole from '../Hole';
import GolfScoreCalculator from '../../calculators/GolfScoreCalculator';
import { golfCourses } from '../../data/golf_courses';
import { CoursesProcessor } from '../../helpers/CoursesProcessor';

const roundTypes = [
  {
    code: 'F',
    description: '9 Holes - Front',
  },
  {
    code: 'B',
    description: '9 Holes - Back',
  },
  {
    code: 'A1',
    description: '18 Holes - Start 1',
  },
  {
    code: 'A10',
    description: '18 Holes - Start 10',
  },
];

class ScoreCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuidv4(),
      player: undefined,
      scores: {},
      courseName: 'default',
      course: golfCourses.default,
      roundType: roundTypes.find(r => r.code === 'A1'),
    };
  }

  setScore = (score, number) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const s = JSON.parse(JSON.stringify(this.state.scores));
    s[number] = score;
    this.setState({ scores: s });
  };

  generateHole = (hole, recordedScore) => (
    <Grid item lg={1} md={1}>
      <Hole
        number={hole.hole}
        handicap={hole.handicap}
        par={hole.par}
        setScore={(score, number) => this.setScore(score, number)}
        score={recordedScore}
        disable={false}
      />
    </Grid>
  );

  nineHoles = (scores, course) =>
    course.map(h => this.generateHole(h, scores[h.hole]));

  sumPar = type => {
    if (!this.state.course[0].par) {
      return undefined;
    }
    const gc = JSON.parse(JSON.stringify(this.state.course));
    if (type === 'FRONT') {
      return gc
        .filter(c => c.hole <= 9)
        .map(c => c.par)
        .reduce((p, c) => p + c, 0);
    }
    if (type === 'BACK') {
      return gc
        .filter(c => c.hole > 9)
        .map(c => c.par)
        .reduce((p, c) => p + c, 0);
    }
    if (type === 'ALL') {
      return gc.map(c => c.par).reduce((p, c) => p + c, 0);
    }
    return undefined;
  };

  hasHandicap = () => {
    const v = this.state.course[0];
    return Boolean(v.handicap);
  };

  createPlayerMenu = () =>
    this.props.scoreCards.players.map(p => (
      <MenuItem value={p}>{`${p.firstName} ${p.lastName}`}</MenuItem>
    ));

  selectPlayer = id => {
    // const p = this.props.scoreCards.players.find(p => p.id = id);
    this.setState({ player: id });
  };

  createRoundTypeMenu = () =>
    roundTypes.map(t => <MenuItem value={t}>{`${t.description}`}</MenuItem>);

  selectRoundType = roundType => {
    const courseProcessor = new CoursesProcessor(
      // eslint-disable-next-line react/no-access-state-in-setstate
      golfCourses[this.state.courseName],
    );
    this.setState({
      roundType,
      course: courseProcessor.courseFactory(roundType.code),
    });
  };

  createCourseMenus = () =>
    Object.keys(golfCourses)
      .filter(g => g !== 'default')
      .map(g => <MenuItem value={g}>{`${g}`}</MenuItem>);

  selectCourse = name => {
    const courseProcessor = new CoursesProcessor(golfCourses[name]);
    // eslint-disable-next-line react/no-access-state-in-setstate
    const rt = JSON.parse(JSON.stringify(this.state.roundType));
    this.setState({
      courseName: name,
      course: courseProcessor.courseFactory(rt.code),
    });
  };

  addScore = () => {
    const score = {
      id: this.state.id,
      courseName: this.state.courseName,
      player: this.state.player,
      score: this.state.scores,
      course: this.state.course,
      roundType: this.state.roundType,
    };
    this.props.saveScoreCard(score);
    this.resetState();
  };

  resetState = () => {
    this.setState({
      id: uuidv4(),
      player: undefined,
      scores: {},
      courseName: 'default',
      course: golfCourses.default,
      roundType: roundTypes.find(r => r.code === 'A1'),
    });
  };

  createNineHoleScoreCard = (side, course, calculator, scores) => (
    <Grid id={side} item container sm={6} md={6} lg={6}>
      {this.nineHoles(scores, course)}
      <Grid item lg={2} md={2}>
        <Hole
          number={side === 'FRONT' ? 'Out' : 'In'}
          par={this.sumPar(side, scores)}
          handicap={this.hasHandicap() ? ' ' : undefined}
          score={side === 'FRONT' ? calculator.outTotal : calculator.inTotal}
          disable
        />
      </Grid>
    </Grid>
  );

  scoreCardFactory = (roundType, calculator, scores) => {
    const courseProcessor = new CoursesProcessor(
      golfCourses[this.state.courseName],
    );
    switch (roundType.code) {
      case 'F':
        return this.createNineHoleScoreCard(
          'FRONT',
          courseProcessor.courseFactory(roundType.code),
          calculator,
          scores,
        );
      case 'B':
        return this.createNineHoleScoreCard(
          'BACK',
          courseProcessor.courseFactory(roundType.code),
          calculator,
          scores,
        );
      case 'A1':
        return (
          <React.Fragment>
            {this.createNineHoleScoreCard(
              'FRONT',
              courseProcessor.courseFactory('F'),
              calculator,
              scores,
            )}
            {this.createNineHoleScoreCard(
              'BACK',
              courseProcessor.courseFactory('B'),
              calculator,
              scores,
            )}
          </React.Fragment>
        );
      case 'A10':
        return (
          <React.Fragment>
            {this.createNineHoleScoreCard(
              'BACK',
              courseProcessor.courseFactory('B'),
              calculator,
              scores,
            )}
            {this.createNineHoleScoreCard(
              'FRONT',
              courseProcessor.courseFactory('F'),
              calculator,
              scores,
            )}
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            {this.createNineHoleScoreCard(
              'FRONT',
              courseProcessor.courseFactory('F'),
              calculator,
              scores,
            )}
            {this.createNineHoleScoreCard(
              'BACK',
              courseProcessor.courseFactory('B'),
              calculator,
              scores,
            )}
          </React.Fragment>
        );
    }
  };

  render() {
    const calculator = new GolfScoreCalculator(this.state.scores);
    console.log(this.props.scoreCards.scores);
    console.log(this.state);
    return (
      <div style={{ marginTop: '50px' }}>
        <Grid container>
          <Grid item md={12} lg={12}>
            <Grid container>
              <Grid item md={3} lg={3}>
                <Grid container justifyContent="flex-start">
                  <Grid item md={10} lg={10}>
                    <FormControl variant="outlined" size="medium">
                      <InputLabel>Player</InputLabel>
                      <Select
                        style={{ minWidth: '150px' }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={this.state.player || ''}
                        onChange={e => this.selectPlayer(e.target.value)}
                      >
                        {this.createPlayerMenu()}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={3} lg={3}>
                <Grid container justifyContent="center">
                  <Grid item md={10}>
                    <FormControl variant="outlined">
                      <InputLabel>Round Type</InputLabel>
                      <Select
                        style={{ minWidth: '150px' }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={this.state.roundType}
                        onChange={e => this.selectRoundType(e.target.value)}
                      >
                        {this.createRoundTypeMenu()}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={3} lg={3}>
                <Grid container justifyContent="center">
                  <Grid item md={10}>
                    <FormControl variant="outlined">
                      <InputLabel>Course</InputLabel>
                      <Select
                        style={{ minWidth: '150px' }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={this.state.courseName}
                        onChange={e => this.selectCourse(e.target.value)}
                      >
                        {this.createCourseMenus()}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={3} lg={3}>
                <Grid container justifyContent="flex-end" alignItems="flex-end">
                  <Grid item md={4}>
                    <Hole
                      number="Total"
                      par={this.sumPar('ALL')}
                      score={calculator.total}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: '50px' }} item>
            <Grid id={this.state.id} container justifyContent="flex-start">
              {this.scoreCardFactory(
                this.state.roundType,
                calculator,
                this.state.scores,
              )}
            </Grid>
          </Grid>
          <Grid item md={12} style={{ marginTop: '20px' }}>
            <Grid container justifyContent="flex-end" alignItems="flex-end">
              <Grid item md={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => this.addScore()}
                >
                  ADD
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ScoreCard.propTypes = {
  saveScoreCard: PropTypes.func,
  scoreCards: PropTypes.object,
};

export default ScoreCard;
