import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUsers, deleteUser, filterUser } from '../../actions/users.actions';

export class Users extends React.PureComponent {
  static propTypes = {
    users: PropTypes.shape([]).isRequired,
    user: PropTypes.shape({}).isRequired,
  };

  componentWillMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  /**
   * Delete user
   * @params {Number} id
   */
  deleteUserHandler = id => {
    const { user, deleteUser } = this.props;

    deleteUser(id, user.data.id === id);
  };

  /**
   * Filter user list action
   */
  filterUserList = event => {
    const { filterUser } = this.props;
    filterUser(event.target.value);
  };

  render() {
    const { users } = this.props;

    return (
      <div>
        <div className="m-2 text-center">
          <input type="text" placeholder="Search" onChange={this.filterUserList} />
          <hr />
        </div>
        <ul>
          {users.filtered &&
            users.filtered.map(item => (
              <div key={item.id}>
                <li>
                  <p>
                    <b>Name: </b>
                    {item.name}
                  </p>
                  <p>
                    <b>Email: </b>
                    {item.email}
                  </p>
                  <p>
                    <b>Role: </b>
                    {item.role}
                  </p>
                </li>
                <div>
                  <button
                    className="btn btn-primary m-2"
                    type="button"
                    onClick={e => {
                      this.deleteUserHandler(item.id);
                    }}
                  >
                    Delete User
                  </button>
                  <NavLink className="btn btn-primary" to={`/users/${item.id}`}>
                    Edit
                  </NavLink>
                </div>
                <hr />
              </div>
            ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  user: state.user,
});

const mapDispatchToProps = {
  getUsers,
  deleteUser,
  filterUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
