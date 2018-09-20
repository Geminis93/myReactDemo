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
    const { options } = this.props;
    const myChart = Echarts.init(this.commonRef);
    const newOption = _.merge({}, LineConfig, options);

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
  height: PropTypes.string,
  options: PropTypes.object,
};

CommonCharts.defaultProps = {
  height: 300,
  options: null,
};

export default CommonCharts;