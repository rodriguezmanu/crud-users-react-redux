import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cleanErrors } from '../../actions/auth.actions';

class ErrorFormMessage extends React.PureComponent {
  static propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
    cleanErrors: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    const { cleanErrors } = this.props;

    cleanErrors();
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="formErrors">
        <div>
          <ul>
            {errors.map(item => (
              <div key={item}>
                <li>
                  <p>{item}</p>
                </li>
              </div>
            ))}
          </ul>
          <div className="alert alert-danger">Form invalid, please check again</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = {
  cleanErrors,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorFormMessage);
