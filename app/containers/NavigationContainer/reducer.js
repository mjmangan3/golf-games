/*
 *
 * NavigationContainer reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import { SAVE_SCORECARD } from '../ScoreCards/constants';

export const initialState = {
  scores: [],
};

/* eslint-disable default-case, no-param-reassign */
const navigationContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        return state;
      case SAVE_SCORECARD:
        return {
          ...state,
          scores: [...state.scores, action.score],
        };
      default:
        return state;
    }
  });

export default navigationContainerReducer;
