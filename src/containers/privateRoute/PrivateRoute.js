import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class PrivateRoute extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    component: PropTypes.func.isRequired,
  };

  render() {
    const { user, component: Component } = this.props;

    return (
      <Route
        render={props =>
          user.isAuth ? (
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
  user: state.user,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute);
