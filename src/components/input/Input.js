import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
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
    const { label, type, placeholder, name } = this.props;

    return (
      <React.Fragment>
        <div className="form-group">
          <label>{label}</label>
          <input
            className="form-control"
            name={name}
            type={type}
            placeholder={placeholder}
            value={this.state[name]}
            onChange={this.handleChange}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default Input;
