import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import './index.scss';

class CreateJs extends Component {
  render() {
    const itemList = [
      {
        left: -75,
      },
      {
        left: -75,
        bottom: 50,
      },
      {
        left: 25,
        bottom: -75,
      },
      {
        left: 175,
        bottom: -75,
      },
      {
        right: 25,
        bottom: -75,
      },
      {
        right: -75,
        bottom: 50,
      },
      {
        right: -75,
      },
    ];

    return (
      <div className="wrap">
        <div className="box">
          <div className="left">left</div>
          <div className="right">right</div>
          {
            itemList.map((item, index) => (
              <div key={index} style={item} className="item-wrap" />
            ))
          }
          <TweenOne className="item" animation={{ left: '-75' }}>1</TweenOne>
          <TweenOne className="item" animation={{ left: '-75', bottom: 50 }}>2</TweenOne>
          <TweenOne className="item" animation={{ left: 25, bottom: '-75' }}>3</TweenOne>
          <TweenOne className="item" animation={{ left: 175, bottom: '-75' }}>4</TweenOne>
          <TweenOne className="item" animation={{ right: 25,  bottom: '-75' }}>5</TweenOne>
        </div>
      </div>
    );
  }
}

export default CreateJs;