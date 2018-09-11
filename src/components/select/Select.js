import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  };

  static defaultProps = {
    value: '',
  };

  componentWillMount() {
    const { name, value } = this.props;

    this.setState({
      [name]: value,
    });
  }

  /**
   * Handler change form
   */
  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { label, name } = this.props;

    return (
      <React.Fragment>
        <div className="form-group">
          <label>{label}</label>
          <select
            value={this.state[name]}
            name="role"
            className="form-control"
            onChange={this.handleChange}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </React.Fragment>
    );
  }
}
export default Select;
