/*
 *
 * ScoreCards actions
 *
 */

import { DEFAULT_ACTION, SAVE_SCORECARD } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function saveScoreCard(score) {
  return {
    type: SAVE_SCORECARD,
    score,
  };
}
