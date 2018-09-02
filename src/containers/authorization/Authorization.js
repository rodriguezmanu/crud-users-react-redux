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
        if (allowedRoles.includes(user.data.role)) {
          return <WrappedComponent {...this.props} />;
        }
        return null;
      }
    }

    const mapStateToProps = state => ({
      user: state.user,
    });

    return connect(mapStateToProps)(WithAuthorization);
  };
}
