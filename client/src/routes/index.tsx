import * as React from 'react';
import * as Redux from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { retrieveCurrentUser } from 'src/redux/actions';

import LoginPage from 'src/modules/login';
import HomePage from 'src/modules/home';
import RoomsPage from 'src/modules/rooms';
import RoomDetailsPage from 'src/modules/room-details';
import GamesPage from 'src/modules/games';
import GameDetailsPage from 'src/modules/game-details';
import IState from 'src/redux/states';

const Routes: React.FC = () => {
  // fetch user once logged in
  const dispatch = Redux.useDispatch();
  const message = Redux.useSelector((state: IState) => {
    return state.mfa.message;
  });
  React.useEffect(() => {
    if (message) {
      dispatch(retrieveCurrentUser());
    }
  }, [message]);

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
          <RoomDetailsPage />
        </Route>
        <Route path='/games' exact={true}>
          <GamesPage />
        </Route>
        <Route path='/games/:id' exact={true}>
          <GameDetailsPage />
        </Route> 
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;