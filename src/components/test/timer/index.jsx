import React, { Component } from 'react';
import timer from './timer';

function Test1() {
  return `<p>test1</p>`;
}

function Test2() {
  return `<p>test2</p>`
}

function Change(props) {
  const flag = props.flag;
  return flag ? <Test1 /> : <Test2 />;
}

class TimerDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'title',
      content: 'contentcontentcontentcontentcontentcontent',
    };
  }

  shouldComponentUpdate(nextProps, nextSate) {
    const { title } = this.state;
    return title !== nextSate.title;
  }

  onChangeState() {
    this.setState({
      title: 'title1',
    });
  }

  render() {
    const { title, content } = this.state;
    return (
      <div>
        <Change flag/>
        <h3>时间戳</h3>
        <p>123456789000</p>
        <p>{ timer(123456789000) }</p>
        <h3>日期</h3>
        <p>2018-09-26 10:00:00</p>
        <p>{ timer('2018-09-26 10:00:00') }</p>
        <h3>日期(年月日)</h3>
        <p>2018年09月26日 10时00分00秒</p>
        <p>{ timer('2018年09月26日 10时00分00秒') }</p>
        
        <div>
          <h4>{ title }</h4>
          <p>{ content }</p>
          <button onClick={() => this.onChangeState()}>aaa</button>
        </div>
      </div>
    );
  }
}

export default TimerDemo;