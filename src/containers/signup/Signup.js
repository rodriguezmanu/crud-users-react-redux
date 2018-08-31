import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/user.actions';

export class Signup extends React.PureComponent {
  static propTypes = {
    user: PropTypes.shape({}).isRequired,
    signup: PropTypes.func.isRequired
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
    const { name: { value: name }, email: { value: email }, password: { value: password } } = e.target;
    const { signup } = this.props;
    console.log(name, email, password);

    signup(name, email, password);
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center m-2">SignUp</h1>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
              <label>Name</label>
              <input className="form-control" onChange={this.handleChange} name="name" type="text" placeholder="Name"/>
          </div>
          <div className="form-group">
              <label>Email</label>
              <input className="form-control" onChange={this.handleChange} name="email" autoComplete="username" type="text" placeholder="Email"/>
          </div>
          <div className="form-group">
              <label>Password</label>
              <input className="form-control" onChange={this.handleChange} name="password" autoComplete="current-password" type="password" placeholder="Password"/>
          </div>
          <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="clear" className="btn btn-default">Clear</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  signup
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
