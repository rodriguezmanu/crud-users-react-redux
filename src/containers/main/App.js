import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../login/Login';
import Signup from '../signup/Signup';
// import PrivateRoute from '../privateRoute/PrivateRoute';
import { logout } from '../../actions/user.actions';

class App extends React.PureComponent {

  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    logout: PropTypes.func.isRequired
  }

  /**
   * Logout Handler
   */
  logoutHandler = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    const { user } = this.props;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar-brand">APP</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
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
            </div>
          </nav>
          <div className="page-container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
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
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
