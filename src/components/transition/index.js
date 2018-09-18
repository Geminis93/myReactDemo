import React, { Component } from 'react';
import { Button } from 'antd';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Motion, spring } from 'react-motion';
import './index.scss';

class Transition extends Component {
  state = {
    showList: [],
  }

  onChange() {
    const list = [
      {
        name: 'a',
        id: 1,
      },
      {
        name: 'b',
        id: 2,
      },
      {
        name: 'c',
        id: 3,
      },
    ];
    const { showList } = this.state;
    this.setState({
      showList: showList.length > 0 ? [] : list,
    })
  }

  render() {
    const { showList } = this.state;
    return (
      <div>
        <h3>react-transition-group <Button onClick={() => this.onChange()}>切换状态</Button></h3>
        <ul>
          <TransitionGroup>
            {
              showList.map(item => (
                <CSSTransition
                  key={item.id}
                  timeout={1000}
                  classNames="style">
                  <li key={item.id}>{item.name}</li>
                </CSSTransition>
              ))
            }
          </TransitionGroup>
        </ul>

        <h3>Animate.css</h3>
        <div>
          <div className="animated fadeInLeftBig" style={{ 'background': '#CCC' }}>aaaaa</div>
        </div>

        <h3>React Motion</h3>
        <div style={{'position': 'relative'}}>
        <Motion defaultStyle={{x: 0, w: 1000}} style={{x: spring(1000), w: spring(200)}}>
          {value => <div style={{
            width: `${value.w}px`,
            textAlign: 'right',
            background: '#CCC',
            position: 'absolute',
            top: 0,
            left: `${value.x}px`
          }}>{value.x}</div>}
        </Motion>
        </div>
      </div>
    );
  }
};

export default Transition;