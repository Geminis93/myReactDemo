import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import ListSort from './listSort';
import './index.scss';

const goodsList = new Array(10).fill({}).map((n, i) => {
  return {
    id: i,
    info: `Goods ${i + 1}`,
    isSelect: false,
  };
});

class DemoDragList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      className: 'drag-list',
      isStart: false,
      dragList: [
        {
          id: 1,
          title: 'a',
          text: 'text 1111',
          style: {
            transitionX: 0,
            transitionY: 0,
          },
        },
        {
          id: 2,
          title: 'b',
          text: 'text 2222',
          style: {
            transitionX: 0,
            transitionY: 0,
          },
        },
        {
          id: 3,
          title: 'c',
          text: 'text 3333',
          style: {
            transitionX: 0,
            transitionY: 0,
          },
        },
        {
          id: 4,
          title: 'd',
          text: 'text 4444',
          style: {
            transitionX: 0,
            transitionY: 0,
          },
        },
      ],
      copyGoods: [],
      goodsList,
    }
  }

  componentDidMount() {
    const { goodsList } = this.state;
    goodsList.map((item, index) => {
      // 商品位置
      const goods = this.goodsDom.children[index];
      const GX = goods.offsetLeft;
      const GY = goods.offsetTop;
      item.style = {
        top: GY,
        left: GX,
        width: 150,
        height: 30,
        borderRadius: 0,
        zIndex: 1,
      };
      return item;
    })
  }
  
  // 商品点击添加动画
  getCarInfo() {
    const { copyGoods, goodsList } = this.state;
    const cartList = [this.cartDomA, this.cartDomB, this.cartDomC];
    const cartIndex = parseInt(Math.random() * 3, 10);
    // 购物车位置
    const CX = cartList[cartIndex].offsetLeft;    
    const CY = cartList[cartIndex].offsetTop;
    // 复制商品
    const copylist = goodsList.filter(n => n.isSelect).map((item, index) => {
      return {
        ...item,
        style: {
          ...item.style,
          endTop: CY,
          endLeft: CX,
        },
      };
    });
    // 添加到动画列表
    this.setState({
      copyGoods: copyGoods.concat(copylist),
    }, () => {
      const list = goodsList.map(item => {
        item.isSelect = false;
        return item;
      });
      this.setState({
        goodsList: list,
      });
    });
  }

  // 切换物品选择项
  onSelect(index) {
    const { goodsList } = this.state;
    goodsList[index].isSelect = !goodsList[index].isSelect;
    this.setState({
      goodsList,
    })
  }

  render() {
    const { copyGoods, goodsList, dragList, className } = this.state;
    return (
      <div>
        <h3>Drag Demo</h3>
        {/* 拖拽列表 */}
        <div className="demo-item">
          <h4>Drag List</h4>
          <div  className="drag-list">
            <ListSort
              dragClassName='drag-item'
              appearAnim={{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}
            >
              {
                dragList.length > 0 && dragList.map((item) => {
                  return (
                    <div className={`${className}-item`} key={item.id}>
                      <h5>{ item.title }</h5>
                      <p>{ item.text }</p>
                    </div>
                  );
                })
              }
            </ListSort>
          </div>
        </div>
        {/* 购物车 */}
        <div className="demo-item">
          <h4>shopping cart</h4>
          <div><button onClick={() => this.getCarInfo()}>true</button></div>
          <div className="cart">
            <ul ref={refs => (this.goodsDom = refs)} className="goods-list">
              {
                goodsList.map((item, i) => {
                  return <li key={item.id} className="goods" onClick={() => this.onSelect(i)}>
                    { item.isSelect ? '√' : '' }
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
                      position: 'absolute',
                      top: interpolatingStyle.top,
                      left: interpolatingStyle.left,
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