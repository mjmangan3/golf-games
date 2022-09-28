/*
 *
 * ScoreCards reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
// eslint-disable-next-line camelcase
import { players } from '../../data/players';
import { golfCourses } from '../../data/golf_courses';

export const initialState = {
  players,
  golfCourses,
};

/* eslint-disable default-case, no-param-reassign */
const scoreCardsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        return state;
      default:
        return state;
    }
  });

export default scoreCardsReducer;
