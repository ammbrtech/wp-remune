import React, { Component } from 'react';
import PropTypes from 'prop-types';

const tableStyle = {
  borderCollapse: "collapse",
  fontSize: "12px",
  margin: 0
};

const headerSummary = {
  margin:0
}

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identity: '',
      plan: '',
      amt: '',
    };
  }

  componentDidMount() {
    const { steps } = this.props;
    const { identity, plan, amt } = steps;

    this.setState({ identity, plan, amt });
  }

  render() {
    const { identity, plan, amt } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h5 style={headerSummary}>Summary</h5>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td width="50%">Remune ID</td>
              <td>{identity.value}</td>
            </tr>
            <tr>
              <td>Plan</td>
              <td>{plan.value}</td>
            </tr>
            <tr>
              <td>XLS</td>
              <td>{amt.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};
