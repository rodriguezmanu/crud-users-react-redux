import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function Authorization(allowedRoles) {
  return WrappedComponent => {
    class WithAuthorization extends React.PureComponent {
      static propTypes = {
        user: PropTypes.shape({}).isRequired,
      };

      render() {
        const { user, location } = this.props;

        if (allowedRoles.includes(user.data.role)) {
          return <WrappedComponent {...this.props} />;
        }
        return (
          <Route>
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
          </Route>
        );
      }
    }

    const mapStateToProps = state => ({
      user: state.user,
    });

    return connect(mapStateToProps)(WithAuthorization);
  };
}
