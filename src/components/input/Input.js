import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
  };

  render() {
    const { label, type, placeholder } = this.props;

    return (
      <React.Fragment>
        <div className="form-group">
          <label>{label}</label>
          <input className="form-control" name={type} type={type} placeholder={placeholder} />
        </div>
      </React.Fragment>
    );
  }
}
export default Input;
