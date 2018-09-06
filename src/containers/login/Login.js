import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/user.actions';
import { emailPattern, passwordPattern } from '../../constants/variables';
import Input from '../../components/input/Input';
import ErrorFormMessage from '../../components/errorFormMessage/ErrorFormMessage';
import validation from '../../util/validator';

export class Login extends React.PureComponent {
  state = {
    isValidForm: true,
    form: [],
  };

  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    login: PropTypes.func.isRequired,
  };

  /**
   * Submit handler
   */
  handleSubmit = e => {
    e.preventDefault();

    const {
      email: { value: email },
      password: { value: password },
    } = e.target;

    const validateForm = validation(this.state.form);

    this.setState({
      form: validateForm.form,
      isValidForm: validateForm.isValidForm,
    });

    if (validateForm.isValidForm) {
      const { login } = this.props;

      login(email, password);
    }
  };

  /**
   * onChange handler
   *
   * @params {String} value
   * @params {String} name
   */
  onChangeForm = (value, name) => {
    const { form } = this.state;
    const index = form.findIndex(el => el.name === value[name].name);

    if (index === -1) {
      const formNew = [...form, value[name]];
      this.setState({
        form: formNew,
      });
    } else {
      this.setState({
        form: [
          ...form.slice(0, index),
          Object.assign({}, form[index], value[name]),
          ...form.slice(index + 1),
        ],
      });
    }
  };

  render() {
    const { isValidForm, form, emailValidator, passwordValidator } = this.state;
    const { user } = this.props;

    return (
      <div className="container">
        <h1 className="text-center m-2">Login</h1>
        <form name="form" onSubmit={this.handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            onChangeInput={this.onChangeForm}
            isRequired
            pattern={emailPattern}
            errorMessage="Must be a valid email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            onChangeInput={this.onChangeForm}
            isRequired
            pattern={passwordPattern}
            errorMessage="Minimum eight characters, at least one letter, one number and one special"
          />
          <div className="form-group text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <ErrorFormMessage form={form} isValid={isValidForm} apiError={user.error} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
