import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user.isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  user: PropTypes.shape({}).isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user });
export default connect(mapStateToProps)(PrivateRoute);
