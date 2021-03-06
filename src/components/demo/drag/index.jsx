import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { range } from 'lodash';
import './index.scss';

const springSetting1 = {stiffness: 180, damping: 10};
const springSetting2 = {stiffness: 120, damping: 17};
function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}
const allText = [
  {
    text: '零',
    id: 0,
    color: '#54AAFF',
  },
  {
    text: '一',
    id: 1,
    color: '#4CC4E8',
  },
  {
    text: '二',
    id: 2,
    color: '#60FFFA',
  },
  {
    text: '三',
    id: 3,
    color: '#4CE8B7',
  },
  {
    text: '四',
    id: 4,
    color: '#54FF98',
  },
  {
    text: '五',
    id: 5,
    color: '#FF310D',
  },
  {
    text: '六',
    id: 6,
    color: '#FF007C',
  },
  {
    text: '七',
    id: 7,
    color: '#E80CE5',
  },
  {
    text: '八',
    id: 8,
    color: '#BF0DFF',
  },
  {
    text: '九',
    id: 9,
    color: '#FFB800',
  },
  {
   text:  '十',
   id: 10,
    color: '#FFFF00',
  }
];
const [count, width, height] = [11, 70, 90];
// indexed by visual position
const layoutO = range(count).map((n) => {
  const row = Math.floor(n / 3);
  const col = n % 3;
  return [width * col, height * row];
});

class DemoDrag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseXY: [0, 0],
      mouseCircleDelta: [0, 0], // difference between mouse and circle pos for x + y coords, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false,
      layout: allText,
    };
  };

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  };

  handleTouchMove = (e) => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  };

  handleMouseMove = ({pageX, pageY}) => {
    const { layout, lastPress, isPressed, mouseCircleDelta: [dx, dy]} = this.state;
    if (isPressed) {
      const mouseXY = [pageX - dx, pageY - dy];
      const col = clamp(Math.floor(mouseXY[0] / width), 0, 2);
      const row = clamp(Math.floor(mouseXY[1] / height), 0, Math.floor(count / 3));
      const index = row * 3 + col;
      const newOrder = reinsert(layout, layout.map(i => i.id).indexOf(lastPress), index);
      this.setState({mouseXY, layout: newOrder});
    }
  };

  handleMouseDown = (key, [pressX, pressY], {pageX, pageY}) => {
    this.setState({
      lastPress: key,
      isPressed: true,
      mouseCircleDelta: [pageX - pressX, pageY - pressY],
      mouseXY: [pressX, pressY],
    });
  };

  handleMouseUp = () => {
    this.setState({isPressed: false, mouseCircleDelta: [0, 0]});
  };

  render() {
    const { layout, lastPress, isPressed, mouseXY } = this.state;
    return (
      <div>
        <h3>Drag Demo</h3>
        <h5>React-motion</h5>
        <div className="demo2">
          {layout.map((_, key) => {
            let style;
            let x;
            let y;
            const visualPosition = layout.map(i => i.id).indexOf(key);
            if (key === lastPress && isPressed) {
              [x, y] = mouseXY;
              style = {
                translateX: x,
                translateY: y,
                scale: spring(1.2, springSetting1),
                boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
              };
            } else {
              [x, y] = layoutO[visualPosition];
              style = {
                translateX: spring(x, springSetting2),
                translateY: spring(y, springSetting2),
                scale: spring(1, springSetting1),
                boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
              };
            }
            return (
              <Motion key={key} style={style}>
                {({translateX, translateY, scale, boxShadow}) =>
                  <div
                    onMouseDown={this.handleMouseDown.bind(null, key, [x, y])}
                    onTouchStart={this.handleTouchStart.bind(null, key, [x, y])}
                    className="demo2-ball"
                    style={{
                      backgroundColor: layout[visualPosition].color,
                      WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                      transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                      zIndex: key === lastPress ? 99 : visualPosition,
                      boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`,
                    }}
                  >{ layout[visualPosition].text }</div>
                }
              </Motion>
            );
          })}
        </div>
        <div className="demoShow">
          <ul>
            {
              layout.map((item) => {
                return <li key={item.id}>{item.id} {item.text}</li>;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default DemoDrag;