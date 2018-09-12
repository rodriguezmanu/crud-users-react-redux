import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, me } from '../../actions/auth.actions';
import routes from '../../routes';

class App extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    logout: PropTypes.func.isRequired,
    me: PropTypes.func.isRequired,
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
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={this.logoutHandler}
                          >
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
              {routes}
            </div>
          </Router>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = {
  logout,
  me,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
