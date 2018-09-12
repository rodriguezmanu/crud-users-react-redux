import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { getUsers, deleteUser, filterUser, getUsersCount } from '../../actions/users.actions';
import './Users.css';
import { limitUsers } from '../../constants/variables';

export class Users extends React.PureComponent {
  static propTypes = {
    users: PropTypes.shape([]).isRequired,
    user: PropTypes.shape({}).isRequired,
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    filterUser: PropTypes.func.isRequired,
    getUsersCount: PropTypes.func.isRequired,
  };

  state = {
    filtered: false,
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

    if (event.target.value === '') {
      this.setState({
        filtered: false,
      });
    } else {
      filterUser(event.target.value);
      this.setState({
        filtered: true,
      });
    }
  };

  /**
   * Handler click pagination
   */
  handlePageClick = data => {
    const { getUsers } = this.props;

    getUsers(data.selected + 1);
    window.scrollTo(0, 0);
  };

  /**
   * Render paginate component
   */
  renderPaginate = () => {
    const { users } = this.props;
    const { filtered } = this.state;
    const pageCount = filtered ? users.countFiltered : users.count;

    if (users.count <= limitUsers) {
      return (
        <div className="m-2">
          <ReactPaginate
            previousLabel="prev"
            nextLabel="next"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      );
    }
    return null;
  };

  render() {
    const { users } = this.props;

    return (
      <div className="m-2 text-center">
        <div className="m-2 text-center">
          <input type="text" placeholder="Search" onChange={this.filterUserList} />
          <hr />
        </div>
        <div>
          {users.filtered && (
            <div>
              <ul className="list-unstyled">
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
          {this.renderPaginate()}
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
