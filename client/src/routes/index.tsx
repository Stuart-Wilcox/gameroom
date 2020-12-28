import * as React from 'react';
import * as Redux from 'react-redux';
import { BrowserRouter as Router, Switch, Route, RouteProps, Redirect } from 'react-router-dom';

import { retrieveCurrentUser } from 'src/redux/actions';

import LoginPage from 'src/modules/login';
import HomePage from 'src/modules/home';
import RoomsPage from 'src/modules/rooms';
import RoomDetailsPage from 'src/modules/room-details';
import GamesPage from 'src/modules/games';
import GameDetailsPage from 'src/modules/game-details';
import IState from 'src/redux/states';

import Navbar from 'src/modules/common/Navbar';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute path='/login' exact={true}>
          <LoginPage />
        </PublicRoute>
        <PrivateRoute path='/rooms' exact={true}>
          <RoomsPage />
        </PrivateRoute>
        <PrivateRoute path='/rooms/:id' exact={true}>
          <RoomDetailsPage />
        </PrivateRoute>
        <PrivateRoute path='/games' exact={true}>
          <GamesPage />
        </PrivateRoute>
        <PrivateRoute path='/games/:id' exact={true}>
          <GameDetailsPage />
        </PrivateRoute> 
        <PublicRoute path='/'>
          {/* TODO make home page */}
          {/* <HomePage /> */}  
          <Redirect to={'/login'}/>
        </PublicRoute>
      </Switch>
    </Router>
  );
}

export const PublicRoute: React.FC<RouteProps> = (props: RouteProps) => {
  return (
    <Route
      {...props}
    />
  );
};

export const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  // fetch user once logged in
  const dispatch = Redux.useDispatch();

  // fetch current user on mount
  React.useEffect(() => {
    dispatch(retrieveCurrentUser());
  });


  return (
    <>
      <Navbar />
      <Route
        {...props}
      />
    </>
  )
};

export default Routes;