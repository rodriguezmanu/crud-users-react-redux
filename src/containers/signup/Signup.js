import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth.actions';
import Input from '../../components/input/Input';
import ErrorFormMessage from '../errorFormMessage/ErrorFormMessage';

export class Signup extends React.PureComponent {
  state = {
    role: 'admin',
  };

  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    signup: PropTypes.func.isRequired,
  };

  /**
   * Handler change form
   */
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  /**
   * Submit handler
   */
  handleSubmit = e => {
    e.preventDefault();

    const {
      name: { value: name },
      email: { value: email },
      password: { value: password },
      role: { value: role },
    } = e.target;
    const { signup } = this.props;

    signup(name, email, password, role);
  };

  render() {
    const { role } = this.state;
    const { user } = this.props;

    return (
      <div className="container">
        <h1 className="text-center m-2">SignUp</h1>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <select value={role} name="role" className="form-control" onChange={this.handleChange}>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <Input label="Name" type="text" placeholder="Name" name="name" />
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
  user: state.auth,
});

const mapDispatchToProps = {
  signup,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
