import React, { Component } from 'react';
import CommonCharts from './common';
import './index.scss';

class DemoCharts extends Component {
  render() {
    return (
      <div>
        <h3>demo 1</h3>
        <CommonCharts height="500px" />
      </div>
    );
  }
};

export default DemoCharts;