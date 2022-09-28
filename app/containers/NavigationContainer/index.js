/**
 *
 * NavigationContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectNavigationContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import Nav from '../../components/Nav';
import { selectDrawerItem } from './actions';

export function NavigationContainer(props) {
  useInjectReducer({ key: 'navigationContainer', reducer });
  useInjectSaga({ key: 'navigationContainer', saga });

  return <Nav {...props} />;
}

NavigationContainer.propTypes = {};

const mapStateToProps = createStructuredSelector({
  navigationContainer: makeSelectNavigationContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    selectDrawerItem: page => dispatch(selectDrawerItem(page)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NavigationContainer);
