/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
import ScoreCards from '../ScoreCards';
import PartnerGame from '../PartnerGame';
import NavigationContainer from '../NavigationContainer';

export default function App(props) {
  return (
    <div>
      <NavigationContainer {...props} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/addScoreCard" component={ScoreCards} />
        <Route exact path="/partnerGame" component={PartnerGame} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
