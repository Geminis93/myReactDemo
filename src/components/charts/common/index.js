import React, { Component } from 'react';
import Echarts from 'echarts';
import PropTypes from 'prop-types';
import './index.scss';

class CommonCharts extends Component {
  componentDidMount() {
    const myChart = Echarts.init(this.commonRef);

    myChart.setOption({
      title: { text: 'ECharts 入门示例' },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    })
  }

  render() {
    const { height } = this.props;
    return (
      <div>
        <div style={{ 'height': `${parseInt(height, 10)}px` }} className="common-chart" ref={refs => this.commonRef = refs}></div>
      </div>
    );
  }
};

CommonCharts.propTypes = {
  type: PropTypes.string,
  height: PropTypes.string,
};

CommonCharts.defaultProps = {
  type: 'line',
  height: 300,
};

export default CommonCharts;