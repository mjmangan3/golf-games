/*
 *
 * NavigationContainer actions
 *
 */

import { DEFAULT_ACTION, SELECT_DRAWER_ITEM } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function selectDrawerItem(page) {
  return {
    type: SELECT_DRAWER_ITEM,
    page,
  };
}
