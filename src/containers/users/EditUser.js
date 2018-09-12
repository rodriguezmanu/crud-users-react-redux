import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { matchPath } from 'react-router';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import ErrorFormMessage from '../errorFormMessage/ErrorFormMessage';
import { getUser, updateUser } from '../../actions/users.actions';

export class EditUser extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    getUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    history: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    this.getUserHandler();
  }

  /**
   * Submit handler
   */
  handleSubmit = e => {
    e.preventDefault();

    const { updateUser, user } = this.props;
    const {
      name: { value: name },
      email: { value: email },
      password: { value: password },
      role: { value: role },
    } = e.target;
    const match = this.getUrlParams();
    const checkRoleChange = user.data.id === Number(match.params.id) && user.data.role !== role;

    updateUser(match.params.id, name, email, password, role, checkRoleChange);
  };

  /**
   * Get Url Params
   *
   * @return {Object}
   */
  getUrlParams = () => {
    const { history } = this.props;
    const match = matchPath(history.location.pathname, {
      path: '/users/:id',
    });

    return match;
  };

  /**
   * Handler change form
   */
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  /**
   * Get User Handler
   */
  getUserHandler = () => {
    const { getUser } = this.props;
    const match = this.getUrlParams();

    getUser(match.params.id);
  };

  /**
   * Handler change form
   */
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { user } = this.props;

    return (
      <div className="container">
        <div>
          <h1 className="text-center m-2">EditUser</h1>
          <NavLink className="btn btn-primary text-center m-2" to="/users/">
            Back to Users
          </NavLink>
        </div>
        {user.data &&
          !user.isFetching && (
            <form name="form" onSubmit={this.handleSubmit}>
              <Select label="Role" name="role" value={user.data.role} />
              <Input
                label="Name"
                type="text"
                placeholder="Name"
                name="name"
                value={user.data.name}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Email"
                name="email"
                value={user.data.email}
              />
              <Input label="Password" type="password" placeholder="Password" name="password" />
              <div className="form-group text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              {user.errors && <ErrorFormMessage errors={user.errors} />}
            </form>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users,
});

const mapDispatchToProps = {
  getUser,
  updateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
