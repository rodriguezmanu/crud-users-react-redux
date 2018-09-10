import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/user.actions';
import Input from '../../components/input/Input';
import ErrorFormMessage from '../../components/errorFormMessage/ErrorFormMessage';

export class Login extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    login: PropTypes.func.isRequired,
  };

  /**
   * Submit handler
   */
  handleSubmit = e => {
    e.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
    } = e.target;
    const { login } = this.props;

    login(email, password);
  };

  render() {
    const { user } = this.props;

    return (
      <div className="container">
        <h1 className="text-center m-2">Login</h1>
        <form name="form" onSubmit={this.handleSubmit}>
          <Input label="Email" type="email" placeholder="Email" name="email" />
          <Input label="Password" type="password" placeholder="Password" name="password" />
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {user.errors && <ErrorFormMessage errors={user.errors} />}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
