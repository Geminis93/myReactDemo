import React, { Component } from 'react'
import { spring, TransitionMotion, } from 'react-motion';
import './index.scss';

class KeyBoard extends Component {
  static defaultProps = {
    onPay: () => { },
  };

  state = {
    show: false,
    inputIndex: 0,
    inputList: new Array(6).fill(''),
    buttonList: [
      {
        title: 1,
        key: 1,
      },
      {
        title: 2,
        key: 2,
      },
      {
        title: 3,
        key: 3,
      },
      {
        title: 4,
        key: 4,
      },
      {
        title: 5,
        key: 5,
      },
      {
        title: 6,
        key: 6,
      },
      {
        title: 7,
        key: 7,
      },
      {
        title: 8,
        key: 8,
      },
      {
        title: 9,
        key: 9,
      },
      {
        title: '清空',
        key: '-1',
      },
      {
        title: 0,
        key: 0,
      },
      {
        title: '删除',
        key: '-2',
      },
    ],
  };

  triggerType() {

  }

  // 键盘输入事件
  inputNumber = (item) => () => {
    const { inputList, inputIndex } = this.state;
    const { onPay } = this.props;
    let i = inputIndex;
    let list = inputList;
    // 清空
    if (item.key === '-1') {
      list = new Array(6).fill('');
      i = 0;
    } else if (item.key === '-2') { // 删除
      i--;
      list.splice(i, 1, '');
    } else { // 输入
      list[i] = item.title;
      i++;
    }
    this.setState({
      inputIndex: i,
      inputList: list,
    }, () => {
      // 六位密码输入完成后的回调
      if (i === 6) {
        if (onPay) {
          onPay();
        }
      }
    })
  }

  clickHandler() {
    this.setState({
      show: !this.state.show
    })
  }

  willEnter() {
    return { height: 0 }
  }

  willLeave() {
    return { height: spring(0) }
  }

  render() {
    const { buttonList, inputList } = this.state;

    return (
      <div>
        <button onClick={this.clickHandler.bind(this)}>run</button>
        <TransitionMotion className="antd-demo"
          styles={this.state.show ? [{
            key: 'test',
            style: { height: spring(230) }
          }] : []}
          willEnter={this.willEnter}
          willLeave={this.willLeave}>
          {inStyles => (
            inStyles[0] ? (
              <div className="box3"
                key={inStyles[0].key}
                style={{
                  height: inStyles[0].style.height,
                }}>
                <ul className="input-wrap">
                  {
                    inputList.map((item, index) => {
                      return (
                        <li key={index} className="input-item">{item ? '·' : ''}</li>
                      );
                    })
                  }
                </ul>
                <ul className="button-wrap">
                  {
                    buttonList.map((item, i) => {
                      return (
                        <li className="button-item" key={item.key} onClick={this.inputNumber(item)}>{
                          item.title
                        }</li>
                      );
                    })
                  }
                </ul>
              </div>
            ) : null
          )}
        </TransitionMotion>
      </div>
    );
  }
};

export default KeyBoard;