import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChangeInput: PropTypes.func.isRequired,
  };

  /**
   * Handler change form
   */
  handleChange = e => {
    const { name, value } = e.target;
    const { onChangeInput } = this.props;

    onChangeInput(
      {
        [name]: {
          value,
          name,
          ...this.props,
        },
      },
      name
    );
  };

  render() {
    const { label, type, placeholder } = this.props;

    return (
      <React.Fragment>
        <div className="form-group">
          <label>{label}</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            name={type}
            type={type}
            placeholder={placeholder}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Input;
