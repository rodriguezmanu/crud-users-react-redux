import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { adminRole, userRole } from '../../constants/variables';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  if (user.isAuth && rest.authorizedRole === adminRole) {
    return (
      <Route
        {...rest}
        render={props => (
          <Component {...props}/>
        )}
      />);
  }

  if (user.isAuth && rest.authorizedRole === userRole) {
    return (
      <Route
        {...rest}
        render={props => (
          <Component {...props}/>
        )}
      />);
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )}
    />);
};

PrivateRoute.propTypes = {
  user: PropTypes.shape({}).isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(PrivateRoute);
