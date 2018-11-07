import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import './index.scss';

const goods = new Array(10).fill({}).map((n, i) => {
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
    }
  }
  
  getCarInfo() {
    // 购物车位置
    const CX = this.cartDomA.offsetLeft;    
    const CY = this.cartDomA.offsetTop;
    const car = [CX, CY];
    // 商品位置
    const index = parseInt(Math.random() * 10, 10);
    const goods = this.goodsDom.children[index];
    const GX = goods.offsetLeft;
    const GY = goods.offsetTop;
    const good = [GX, GY];
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <h3>Drag Demo</h3>
        <div className="demo-item">
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
        </div>
        <div className="demo-item">
          <h4>shopping cart</h4>
          <div><button onClick={() => this.getCarInfo()}>true</button></div>
          <div className="cart">
            <ul ref={refs => (this.goodsDom = refs)} className="goods-list">
              {
                goods.map((item, i) => {
                  return <li key={item.id} className="goods">
                    { item.info }
                  </li>;
                })
              }
            </ul>
            <div className="car" ref={refs => (this.cartDomA = refs)}>A</div>
            {/* <div className="car" ref={refs => (this.cartDomB = refs)}>B</div> */}
            {/* <div className="car" ref={refs => (this.cartDomC = refs)}>C</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default DemoDragList;