/*
 *
 * PartnerGame reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
// import { SAVE_SCORECARD } from '../ScoreCards/constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const partnerGameReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        return state;
      default:
        return state;
    }
  });

export default partnerGameReducer;
