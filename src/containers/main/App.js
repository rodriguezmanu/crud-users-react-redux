import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Authorization from '../authorization/Authorization';
import Users from '../users/Users';
import Home from '../../components/home/Home';
import PrivateRoute from '../privateRoute/PrivateRoute';
import { logout, me } from '../../actions/user.actions';
import jwtDecode from 'jwt-decode';
import { userRole, adminRole } from '../../constants/variables';

class App extends React.PureComponent {

  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    logout: PropTypes.func.isRequired
  }

  /**
   * Handler user data from token saved on localStorage
   */
  handlerMe = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      const { me } = this.props;

      me(user);
    }
  };

  componentDidMount() {
    this.handlerMe();
  }

  /**
   * Logout Handler
   */
  logoutHandler = () => {
    const { logout } = this.props;
    logout();
  };

  /**
   * Handler redirection authorization depends on roles
   * @param {Object} user
   * @return {String} jsx
   */
  redirectionAuth = (user) => {
    if (user.isAuth && user.data.role === adminRole) {
      return <Redirect to="/users" />;
    } else if (user.isAuth && user.data.role === userRole) {
      return <Redirect to="/home" />;
    }
  };

  render() {
    const User = Authorization(['user']);
    const Admin = Authorization(['admin']);
    const { user } = this.props;

    return (
      <Router>
        <div>
          {this.redirectionAuth(user)}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">APP</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {user.isAuth ? (
                <ul className="navbar-nav">
                  <li>
                    <div className="nav-item nav-link">
                      {user.data.name}
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-item">
                      <a className="nav-link" href="" onClick={this.logoutHandler}>Logout</a>
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
              <Route exact path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/users" component={Admin(Users)}/>
              <PrivateRoute path="/home" component={User(Home)}/>
              <Redirect to="/login" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  logout,
  me
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
