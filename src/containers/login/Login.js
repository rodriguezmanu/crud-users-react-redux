import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/user.actions';

export class Login extends React.Component {

  state = {
    isValidForm: true
  }

  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    login: PropTypes.func.isRequired
  }

  /**
   * Handler change form
   */
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  /**
   * Submit handler
   */
  handleSubmit = (e) => {
    e.preventDefault();

    const form = [
      {
        id: 'email',
        value: e.target.email.value,
        pattern: /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/
      },
      {
        id: 'password',
        value: e.target.password.value,
        pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/
      }
    ];

    this.validateForm(form);

    const { login } = this.props;
      // login(email, password);
  }

  /**
   * Validation Form
   * @param {Array} form
   */
  validateForm = (form) => {
    let isValid = true;

    for (let index = 0; index < form.length; index++) {
      const element = form[index];
      const regex = RegExp(element.pattern);
      const res = regex.test(element.value);

      this.setState({
        [element.id+'Validator']: res
      });

      if (!res) {
        isValid = false;
      }
    }
    this.setState({ isValidForm: isValid });
  };

  render() {
    const { isValidForm, emailValidator, passwordValidator } = this.state;

    return (
      <div className="container">
        <h1 className="text-center m-2">Login</h1>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" onChange={this.handleChange} name="email" autoComplete="username" type="email" placeholder="Email"/>
            {!emailValidator && !isValidForm && (
              <small className="form-text text-muted">
                Email invalid
              </small>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" onChange={this.handleChange} name="password" autoComplete="current-password" type="password" placeholder="Password"/>
            {!passwordValidator && !isValidForm && (
              <small className="form-text text-muted">
                Minimum eight characters, at least one letter, one number and one special character
              </small>
            )}
          </div>
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="clear" className="btn btn-default">Clear</button>
          </div>
          {!isValidForm && (
            <div className="alert alert-danger">
              Form invalid, please check again
            </div>
          )}
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);