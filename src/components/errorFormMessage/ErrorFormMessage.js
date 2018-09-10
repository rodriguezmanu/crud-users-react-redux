import React from 'react';
import PropTypes from 'prop-types';

class ErrorFormMessage extends React.PureComponent {
  static propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="formErrors">
        <div>
          <ul>
            {errors.map(item => (
              <div key={item}>
                <li>
                  <p>{item}</p>
                </li>
              </div>
            ))}
          </ul>
          <div className="alert alert-danger">Form invalid, please check again</div>
        </div>
      </div>
    );
  }
}

export default ErrorFormMessage;
