import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the partnerGame state domain
 */

const selectPartnerGameDomain = state => state.partnerGame || initialState;

const selectScores = state => state.navigationContainer.scores;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PartnerGame
 */

const makeSelectPartnerGame = () =>
  createSelector(
    selectPartnerGameDomain,
    selectScores,
    (substate, scores) => Object.assign(substate, { scores }),
    // substate => substate,
  );

export default makeSelectPartnerGame;
export { selectPartnerGameDomain };
