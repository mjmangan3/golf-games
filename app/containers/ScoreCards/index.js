/**
 *
 * ScoreCards
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectScoreCards from './selectors';
import reducer from './reducer';
import saga from './saga';
import ScoreCard from '../../components/ScoreCard';
import { saveScoreCard } from './actions';

export function ScoreCards(props) {
  useInjectReducer({ key: 'scoreCards', reducer });
  useInjectSaga({ key: 'scoreCards', saga });

  return <ScoreCard {...props} />;
}

ScoreCards.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  scoreCards: makeSelectScoreCards(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveScoreCard: score => dispatch(saveScoreCard(score)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ScoreCards);
