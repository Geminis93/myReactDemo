import React, { Component } from 'react';
import Echarts from 'echarts';
import PropTypes from 'prop-types';
import _ from 'lodash';
import LineConfig from './LineConfig';
import './index.scss';

class CommonCharts extends Component {
  state = {
    myChart: null
  }

  componentDidMount() {
    const { type, options } = this.props;
    const myChart = Echarts.init(this.commonRef);
    let newOption = null;
    switch (type) {
      case 'line':
        newOption = _.merge({}, LineConfig, options);
        break;
      default:
        break;
    }

    myChart.setOption(newOption);

    this.setState({
      myChart: myChart
    })
  }

  render() {
    const { height } = this.props;
    return (
      <div>
        <div
          style={{ 'height': `${parseInt(height, 10)}px` }}
          ref={refs => this.commonRef = refs}></div>
      </div>
    );
  }
};

CommonCharts.propTypes = {
  type: PropTypes.string,
  height: PropTypes.string,
  options: PropTypes.object,
};

CommonCharts.defaultProps = {
  type: 'line',
  height: 300,
  options: null,
};

export default CommonCharts;