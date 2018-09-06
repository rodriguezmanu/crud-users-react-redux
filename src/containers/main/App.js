import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Authorization from '../authorization/Authorization';
import Users from '../users/Users';
import EditUser from '../users/EditUser';
import Home from '../../components/home/Home';
import PrivateRoute from '../privateRoute/PrivateRoute';
import PublicRoute from '../publicRoute/PublicRoute';
import { logout, me } from '../../actions/user.actions';

class App extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    logout: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.handlerMe();
  }

  /**
   * Handler user data from token saved on localStorage
   */
  handlerMe = () => {
    const { me } = this.props;
    me();
  };

  /**
   * Logout Handler
   */
  logoutHandler = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const User = Authorization(['user']);
    const Admin = Authorization(['admin']);
    const { user } = this.props;

    return (
      <React.Fragment>
        {!user.isFetching && (
          <Router>
            <div>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="navbar-brand">APP</div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  {user.isAuth ? (
                    <ul className="navbar-nav">
                      <li>
                        <div className="nav-item nav-link">{user.data.name}</div>
                      </li>
                      <li className="nav-item">
                        <div className="nav-item">
                          <button className="nav-link" type="button" onClick={this.logoutHandler}>
                            Logout
                          </button>
                        </div>
                      </li>
                    </ul>
                  ) : (
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <div className="nav-item nav-link">
                          <Link to="/login">Login</Link>
                        </div>
                      </li>
                      <li className="nav-item">
                        <div className="nav-item nav-link">
                          <Link to="/signup">Signup</Link>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
              </nav>
              <div className="page-container">
                <Switch>
                  <PublicRoute exact path="/login" component={Login} />
                  <PublicRoute path="/signup" component={Signup} />
                  <PrivateRoute path="/users/edit/:id" component={Admin(EditUser)} />
                  <PrivateRoute path="/users" component={Admin(Users)} />
                  <PrivateRoute path="/home" component={User(Home)} />
                  <Redirect to="/login" />
                </Switch>
              </div>
            </div>
          </Router>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  logout,
  me,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
