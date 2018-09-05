import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        <div>
          <input type="text" placeholder="Search" onChange={this.filterUserList} />
        </div>
        <ul>
          {users.filtered &&
            users.filtered.map(item => (
              <div key={item.id}>
                <li>
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>{item.role}</p>
                </li>
                <div>
                  <button
                    type="button"
                    onClick={e => {
                      this.deleteUserHandler(item.id);
                    }}
                  >
                    Delete User
                  </button>
                </div>
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
