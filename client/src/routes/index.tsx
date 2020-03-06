import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from 'src/modules/login';
import HomePage from 'src/modules/home';
import RoomsPage from 'src/modules/rooms';
import RoomsDetailsPage from 'src/modules/rooms-details';
import GamesPage from 'src/modules/games';
import GamesDetailsPage from 'src/modules/games-details';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/rooms' exact={true}>
          <RoomsPage />
        </Route>
        <Route path='/rooms/:id' exact={true}>
          <RoomsDetailsPage />
        </Route>
        <Route path='/games' exact={true}>
          <GamesPage />
        </Route>
        <Route path='/games/:id' exact={true}>
          <GamesDetailsPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
