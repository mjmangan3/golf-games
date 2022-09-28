/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import scoreCardsReducer from './containers/ScoreCards/reducer';
import partnerGameReducer from './containers/PartnerGame/reducer';
import navigationContainerReducer from './containers/NavigationContainer/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    router: connectRouter(history),
    scoreCards: scoreCardsReducer,
    partnerGame: partnerGameReducer,
    navigationContainer: navigationContainerReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
