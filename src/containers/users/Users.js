import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getUsers, deleteUser, filterUser, getUsersCount } from '../../actions/users.actions';

export class Users extends React.PureComponent {
  static propTypes = {
    users: PropTypes.shape([]).isRequired,
    user: PropTypes.shape({}).isRequired,
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    filterUser: PropTypes.func.isRequired,
    getUsersCount: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { getUsers, getUsersCount } = this.props;

    getUsers();
    getUsersCount();
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

  /**
   * Handler click pagination
   */
  handlePageClick = data => {
    const { getUsers } = this.props;

    getUsers(data.selected + 1);
    window.scrollTo(0, 0);
  };

  render() {
    const { users } = this.props;

    return (
      <div>
        <div className="m-2 text-center">
          <input type="text" placeholder="Search" onChange={this.filterUserList} />
          <hr />
        </div>
        <div>
          {users.filtered && (
            <div>
              <ul>
                {users.filtered.map(item => (
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
                        {item.role.toUpperCase()}
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
          )}
          <ReactPaginate
            previousLabel="prev"
            nextLabel="next"
            pageCount={users.count}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
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
  getUsersCount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
