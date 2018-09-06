import React from 'react';
import PropTypes from 'prop-types';

class ErrorFormMessage extends React.PureComponent {
  static propTypes = {
    isValid: PropTypes.bool.isRequired,
    apiError: PropTypes.object,
  };

  render() {
    const { form, isValid, apiError } = this.props;

    return (
      <div className="formErrors">
        {!isValid && (
          <div>
            <ul>
              {form.filter(item => item.isValid === false).map(item => (
                <div key={item.name}>
                  <li>
                    <p>{item.errorMessage}</p>
                  </li>
                </div>
              ))}
            </ul>
            <div className="alert alert-danger">Form invalid, please check again</div>
          </div>
        )}
        {isValid && apiError && <div className="alert alert-danger">{apiError.message}</div>}
      </div>
    );
  }
}

export default ErrorFormMessage;
