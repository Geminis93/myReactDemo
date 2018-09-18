import React, { Component } from 'react';
import { Button } from 'antd';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
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
                  <li key={item.id}>{ item.name }</li>
                </CSSTransition>
              ))
            }
          </TransitionGroup>
        </ul>
      </div>
    );
  }
};

export default Transition;