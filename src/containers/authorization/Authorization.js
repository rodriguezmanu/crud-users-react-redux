import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function Authorization(allowedRoles) {
  return WrappedComponent => {
    class WithAuthorization extends React.PureComponent {

      static propTypes = {
        user: PropTypes.shape({}).isRequired,
      };

      render() {
        const { user } = this.props;

        console.log('Authorization');

        if (allowedRoles.includes(user.data.role)) {
          return <WrappedComponent {...this.props} />;
        } else {
          return <h1>No page for you!</h1>;
        }
      }
    };

    const mapStateToProps = (state) => ({
      user: state.user
    });

    return connect(mapStateToProps)(WithAuthorization);
  };
};
