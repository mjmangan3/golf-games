/* eslint-disable prettier/prettier */
/**
 *
 * PartnerGameCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  TableBody,
  Paper,
} from "@material-ui/core";
import GolfScoreCalculator from '../../calculators/GolfScoreCalculator';
import PartnerDotCalculator from '../../calculators/PartnerDotCalculator';
// import styled from 'styled-components';

class PartnerGameCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      player1: undefined,
      player2: undefined,
      player3: undefined,
      player4: undefined,
    };
  }

  createPlayerMenu = () =>
    this.props.partnerGame.scores
      .map(s => s.player)
      .map(p => (
        <MenuItem value={p}>{`${p.firstName} ${p.lastName}`}</MenuItem>
      ));

  selectPlayer1 = player => {
    this.setState({ player1: player });
  };

  selectPlayer2 = player => {
    this.setState({ player2: player });
  };

  selectPlayer3 = player => {
    this.setState({ player3: player });
  };

  selectPlayer4 = player => {
    this.setState({ player4: player });
  };

  createTableRow = data => (
    <TableRow>
      <TableCell>{data.hole}</TableCell>
      <TableCell>{data.handicap}</TableCell>
      <TableCell>{data.p1Score}</TableCell>
      <TableCell>{data.p2Score}</TableCell>
      <TableCell>{`${data.lowTeam1}/${data.lowTotalTeam1}`}</TableCell>
      <TableCell>{data.par}</TableCell>
      <TableCell>{`${data.carryOverLow}/${data.carryOverTotal}`}</TableCell>
      <TableCell>{`${data.lowTeam2}/${data.lowTotalTeam2}`}</TableCell>
      <TableCell>{data.p3Score}</TableCell>
      <TableCell>{data.p4Score}</TableCell>
    </TableRow>
  );

  createCard = scores => {
    const s1 = scores.find(s => s.player.id === this.state.player1.id);
    const s2 = scores.find(s => s.player.id === this.state.player2.id);
    const s3 = scores.find(s => s.player.id === this.state.player3.id);
    const s4 = scores.find(s => s.player.id === this.state.player4.id);
    const c1 = new GolfScoreCalculator(s1.score);
    const c2 = new GolfScoreCalculator(s2.score);
    const c3 = new GolfScoreCalculator(s3.score);
    const c4 = new GolfScoreCalculator(s4.score);
    // eslint-disable-next-line no-undef
    const processor = new PartnerDotCalculator(s1, s2, s3, s4);
    const dataList = processor.createMatch();
    const t1lowTotal = dataList.map(d => d.lowTeam1).reduce((a,b) => a + b, 0);
    const t2lowTotal = dataList.map(d => d.lowTeam2).reduce((a,b) => a + b, 0);
    const t1lowTeamTotal = dataList.map(d => d.lowTotalTeam1).reduce((a,b) => a + b, 0);
    const t2lowTeamTotal = dataList.map(d => d.lowTotalTeam2).reduce((a,b) => a + b, 0);
    const sumPar = dataList.map(p => p.par).reduce((a,b) => a + b, 0)
    const t1TotalDots = t1lowTotal + t1lowTeamTotal;
    const t2TotalDots = t2lowTotal + t2lowTeamTotal;
    const t1Payout = t1TotalDots - t2TotalDots;
    const t2Payout = t2TotalDots - t1TotalDots;
    return (
      <React.Fragment>
        {dataList.map(d => this.createTableRow(d))}
        <TableRow>
          <TableCell>Totals</TableCell>
          <TableCell/>
          <TableCell>{c1.total}</TableCell>
          <TableCell>{c2.total}</TableCell>
          <TableCell>{`${t1lowTotal}/${t1lowTeamTotal}`}</TableCell>
          <TableCell>{sumPar}</TableCell>
          <TableCell/>
          <TableCell>{`${t2lowTotal}/${t2lowTeamTotal}`}</TableCell>
          <TableCell>{c3.total}</TableCell>
          <TableCell>{c4.total}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Dots Earned</TableCell>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell>{`${t1TotalDots}`}</TableCell>
          <TableCell/>
          <TableCell/>
          <TableCell>{`${t2TotalDots}`}</TableCell>
          <TableCell/>
          <TableCell/>
        </TableRow>
        <TableRow>
          <TableCell>Payout</TableCell>
          <TableCell/>
          <TableCell/>
          <TableCell/>
          <TableCell>{`${t1Payout}`}</TableCell>
          <TableCell/>
          <TableCell/>
          <TableCell>{`${t2Payout}`}</TableCell>
          <TableCell/>
          <TableCell/>
        </TableRow>
      </React.Fragment>
    );
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ marginTop: '50px' }}>
        <Grid container>
          <Grid item>
            <FormControl variant="outlined" size="medium">
              <InputLabel>Player1</InputLabel>
              <Select
                style={{ minWidth: '150px' }}
                inputProps={{ 'aria-label': 'Without label' }}
                value={this.state.player1 || ''}
                onChange={e => this.selectPlayer1(e.target.value)}
              >
                {this.createPlayerMenu()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" size="medium">
              <InputLabel>Player2</InputLabel>
              <Select
                style={{ minWidth: '150px' }}
                inputProps={{ 'aria-label': 'Without label' }}
                value={this.state.player2 || ''}
                onChange={e => this.selectPlayer2(e.target.value)}
              >
                {this.createPlayerMenu()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" size="medium">
              <InputLabel>Player3</InputLabel>
              <Select
                style={{ minWidth: '150px' }}
                inputProps={{ 'aria-label': 'Without label' }}
                value={this.state.player3 || ''}
                onChange={e => this.selectPlayer3(e.target.value)}
              >
                {this.createPlayerMenu()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl variant="outlined" size="medium">
              <InputLabel>Player4</InputLabel>
              <Select
                style={{ minWidth: '150px' }}
                inputProps={{ 'aria-label': 'Without label' }}
                value={this.state.player4 || ''}
                onChange={e => this.selectPlayer4(e.target.value)}
              >
                {this.createPlayerMenu()}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {
          this.state.player1 && this.state.player2 && this.state.player3 && this.state.player4 ?
            <Grid container>
              <Grid item md={12} lg={12}>
                <TableContainer component={Paper}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Hole</TableCell>
                      <TableCell>Handicap</TableCell>
                      <TableCell>{`${this.state.player1.firstName} ${this.state.player1.lastName}`}</TableCell>
                      <TableCell>{`${this.state.player2.firstName} ${this.state.player2.lastName}`}</TableCell>
                      <TableCell>dots</TableCell>
                      <TableCell>par</TableCell>
                      <TableCell>carry over</TableCell>
                      <TableCell>dots</TableCell>
                      <TableCell>{`${this.state.player3.firstName} ${this.state.player3.lastName}`}</TableCell>
                      <TableCell>{`${this.state.player4.firstName} ${this.state.player4.lastName}`}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.createCard(this.props.partnerGame.scores)}

                  </TableBody>
                </TableContainer>
              </Grid>
            </Grid> :
            undefined
        }
      </div>
    );
  }
}

PartnerGameCard.propTypes = {
  partnerGame: PropTypes.object,
};

export default PartnerGameCard;
