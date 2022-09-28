/**
 *
 * PartnerGame
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPartnerGame from './selectors';
import reducer from './reducer';
import saga from './saga';
import PartnerGameCard from '../../components/PartnerGameCard';

export function PartnerGame(props) {
  useInjectReducer({ key: 'partnerGame', reducer });
  useInjectSaga({ key: 'partnerGame', saga });

  return <PartnerGameCard {...props} />;
}

PartnerGame.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  partnerGame: makeSelectPartnerGame(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PartnerGame);
