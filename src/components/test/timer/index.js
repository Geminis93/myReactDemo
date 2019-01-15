import React, { Component } from 'react';
import timer from './timer';

class TimerDemo extends Component {
  render() {
    return (
      <div>
        <h3>时间戳</h3>
        <p>123456789000</p>
        <p>{ timer(123456789000) }</p>
        <h3>日期</h3>
        <p>2018-09-26 10:00:00</p>
        <p>{ timer('2018-09-26 10:00:00') }</p>
        <h3>日期(年月日)</h3>
        <p>2018年09月26日 10时00分00秒</p>
        <p>{ timer('2018年09月26日 10时00分00秒') }</p>
      </div>
    );
  }
}

export default TimerDemo;