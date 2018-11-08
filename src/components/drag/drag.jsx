import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import './index.scss';

const goodsList = new Array(10).fill({}).map((n, i) => {
  return {
    id: i,
    info: `Goods ${i + 1}`,
  };
});

class DemoDragList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          id: 1,
          title: 'a',
          text: 'text 1111',
        },
        {
          id: 2,
          title: 'b',
          text: 'text 2222',
        },
        {
          id: 3,
          title: 'c',
          text: 'text 3333',
        },
        {
          id: 4,
          title: 'd',
          text: 'text 4444',
        },
      ],
      copyGoods: [],
    }
  }
  
  getCarInfo() {
    const { copyGoods } = this.state;
    // 购物车位置
    const CX = this.cartDomA.offsetLeft;    
    const CY = this.cartDomA.offsetTop;
    const car = [CX, CY];
    // 商品位置
    const index = parseInt(Math.random() * 10, 10);
    const goods = this.goodsDom.children[index];
    const GX = goods.offsetLeft;
    const GY = goods.offsetTop;
    // 复制商品
    const copylist = goodsList.filter((n, i) => i === index).map((item) => {
      return {
        ...item,
        style: {
          top: GY,
          left: GX,
          width: 150,
          height: 30,
          borderRadius: 0,
          endTop: CY,
          endLeft: CX,
          opacity: 1,
        },
      };
    });
    this.setState({
      copyGoods: copyGoods.concat(copylist),
    });
    // 添加到动画列表
  }

  render() {
    const { copyGoods } = this.state;
    console.log(copyGoods);
    return (
      <div>
        <h3>Drag Demo</h3>
        {/* <div className="demo-item">
          <h4>Drag List</h4>
          <div className="drag-list">
            {
              list.map((item, i) => {
                return <div key={item.title} className="drag-list-item">
                  <h5>{ item.title }</h5>
                  <p>{ item.text }</p>
                </div>;
              })
            }
          </div>
        </div> */}
        <div className="demo-item">
          <h4>shopping cart</h4>
          <div><button onClick={() => this.getCarInfo()}>true</button></div>
          <div className="cart">
            <ul ref={refs => (this.goodsDom = refs)} className="goods-list">
              {
                goodsList.map((item, i) => {
                  return <li key={item.id} className="goods">
                    { item.info }
                  </li>;
                })
              }
            </ul>
            {
              copyGoods.length > 0 && copyGoods.map((item, i) => {
                const style = item.style;
                return <Motion
                  key={i}
                  defaultStyle={style}
                  style={{
                    ...style,
                    width: spring(30),
                    height: spring(30),
                    borderRadius: spring(30),
                    top: spring(style.endTop),
                    left: spring(style.endLeft),
                    opacity: spring(0),
                  }}
                  onRest={() => {
                    this[`motion${i}`].remove();
                  }}>
                  {interpolatingStyle =>
                    <div style={{
                      ...interpolatingStyle,
                      width: `${interpolatingStyle.width}px`,
                      height: `${interpolatingStyle.height}px`,
                      borderRadius: interpolatingStyle.borderRadius,
                      backgroundColor: '#F00',
                      position: "absolute",
                      top: interpolatingStyle.top,
                      left: interpolatingStyle.left,
                      opacity: interpolatingStyle.opacity,
                  }}
                  ref={refs => this[`motion${i}`] = refs}>{ item.info }</div>
                  }
                </Motion>})
            }
            <div className="cars">
              <div className="car" ref={refs => (this.cartDomA = refs)}>A</div>
              <div className="car" ref={refs => (this.cartDomB = refs)}>B</div>
              <div className="car" ref={refs => (this.cartDomC = refs)}>C</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DemoDragList;