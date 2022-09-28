import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the scoreCards state domain
 */

const selectScoreCardsDomain = state => state.scoreCards || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ScoreCards
 */

const makeSelectScoreCards = () =>
  createSelector(
    selectScoreCardsDomain,
    substate => substate,
  );

export default makeSelectScoreCards;
export { selectScoreCardsDomain };
