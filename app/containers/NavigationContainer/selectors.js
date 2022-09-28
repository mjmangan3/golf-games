import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the navigationContainer state domain
 */

const selectNavigationContainerDomain = state =>
  state.navigationContainer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NavigationContainer
 */

const makeSelectNavigationContainer = () =>
  createSelector(
    selectNavigationContainerDomain,
    substate => substate,
  );

export default makeSelectNavigationContainer;
export { selectNavigationContainerDomain };
