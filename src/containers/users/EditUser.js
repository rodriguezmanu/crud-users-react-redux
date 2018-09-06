import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class EditUser extends React.PureComponent {
  static propTypes = {};

  componentWillMount() {}

  render() {
    return (
      <div>
        <div>EditUser</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
