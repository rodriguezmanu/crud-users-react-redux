import React from 'react';
import { Switch, Redirect } from 'react-router';
import Login from '../containers/login/Login';
import Signup from '../containers/signup/Signup';
import Users from '../containers/users/Users';
import EditUser from '../containers/users/EditUser';
import Home from '../components/home/Home';
import PrivateRoute from '../containers/privateRoute/PrivateRoute';
import PublicRoute from '../containers/publicRoute/PublicRoute';
import { adminRoles, userRoles } from '../constants/variables';

const routes = (
  <div className="page-container">
    <Switch>
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute path="/signup" component={Signup} />
      <PrivateRoute path="/users/:id" component={EditUser} allowedRoles={adminRoles} />
      <PrivateRoute path="/users" component={Users} allowedRoles={adminRoles} />
      <PrivateRoute path="/home" component={Home} allowedRoles={userRoles} />
      <Redirect to="/login" />
    </Switch>
  </div>
);

export default routes;
