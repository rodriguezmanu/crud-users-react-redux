import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class PrivateRoute extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    component: PropTypes.func.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { user, component: Component, allowedRoles, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          user.isAuth && allowedRoles.includes(user.data.role) ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
