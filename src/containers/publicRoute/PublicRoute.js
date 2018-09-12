import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userRole, adminRole } from '../../constants/variables';

export class PublicRoute extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    component: PropTypes.func.isRequired,
  };

  render() {
    const { user, component: Component } = this.props;

    return (
      <Route
        render={props => {
          let toPath;

          if (user.isAuth && user.data.role === adminRole) {
            toPath = 'users';
          }
          if (user.isAuth && user.data.role === userRole) {
            toPath = 'home';
          }

          if (toPath) {
            return (
              <Route>
                <Redirect to={toPath} />
              </Route>
            );
          }
          return <Component {...props} />;
        }}
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
)(PublicRoute);
