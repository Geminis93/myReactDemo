import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import style from './index.scss';

const cx = classnames.bind(style);

class CarouselComponents extends PureComponent {
  constructor(props) {
    super(props);

    const { imgData } = props;
    this.state = {
      start: false,
      showNumber: 1,
      moveX: null,
      interval: null,
      list: [
        imgData[imgData.length - 1],
        ...imgData,
        imgData[0],
        imgData[1],
      ],
    }
  }

  componentDidMount() {
    const { autoplay } = this.props;
    autoplay && this.autoPlay();
  }

  onTapFn(item, index, e) {
    console.log('index ---- ', item, index);
    // const { onTapItem } = this.props;
    // onTapItem(item);
  }

  autoPlay() {
    const fn = setInterval(() => {
      const { showNumber } = this.state;
      const index = showNumber + 1;
      this.onSetNumber(index);
    }, 5000);

    this.setState({
      interval: fn,
    });
  }

  onSetNumber(index) {
    this.setState({
      showNumber: index,
    }, () => {
      const { showNumber, list } = this.state;
      let number = showNumber;
      switch (number) {
        case 0:
          number = list.length - 3
          break;
        case list.length - 2:
          number = 1
          break;
      
        default:
          break;
      }
      setTimeout(() => {
        this.setState({
          showNumber: number,
        })
      }, 500);
    })
    
  }

  onTouchStart = (e) => {
    e.preventDefault();
    if ((e.touches && e.touches.length > 1) || this.length <= 1) {
      return;
    }
    const { interval } = this.state;
    clearInterval(interval);
    this.startX = e.pageX || e.touches[0].pageX;
    this.setState({
      start: true,
    });
  }

  onTouchMove = (e) => {
    e.preventDefault();
    if ((e.touches && e.touches.length > 1) || this.length <= 1 || !this.startX) {
      return;
    }
    const x = e.pageX || e.touches[0].pageX;
    const move = x - this.startX;
    this.setState({
      moveX: move,
    });
  }

  onTouchEnd = (e) => {
    e.preventDefault();
    if ((e.changedTouches && e.changedTouches.length > 1) || this.length <= 1 || !this.startX) {
      return;
    }
    
    const { autoplay } = this.props;
    const { showNumber } = this.state;
    const x = e.pageX || e.changedTouches[0].pageX;
    const differ = x - this.startX;
    
    this.startX = null;
    this.setState({
      start: false,
      moveX: null,
    }, () => {
      const number = Math.abs(differ) > 250 ? showNumber + (differ > 0 ? -1 : 1) : showNumber;
      this.onSetNumber(number);
      autoplay && this.autoPlay();
    });
  }

  render() {
    const { showNumber, moveX, list } = this.state;
    return (
      <div
        className={cx('carousel-style-wrap')}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onMouseDown={this.onTouchStart}
        onMouseMove={this.onTouchMove}
        onMouseUp={this.onTouchEnd}>
        <ul className={cx('carousel-style')}>
          {
            list.map((item, index) => {
              const x = 500 * (index - showNumber);
              const z = index > 0 ? -100 * (index - showNumber) : 100;
              const style = moveX !== null ? {
                left: `${x + moveX}px`,
                WebkitTransform: `translateZ(${z - (moveX / 4)}px)`,
                transform: `translateZ(${z - (moveX / 4)}px)`,
              } : {
                WebkitTransition: 'all 0.5s',
              };
              return (
                <li
                  key={index}
                  onClick={(e) => this.onTapFn(item, index, e)}
                  className={cx(
                    'carousel-style-item',
                    {
                      'carousel-style-item-nth0': showNumber - 1 === index,
                      'carousel-style-item-nth1': showNumber === index,
                      'carousel-style-item-nth2': showNumber + 1 === index,
                      'carousel-style-item-nth3': showNumber + 2 === index,
                    },
                  )}
                  style={style}>
                  { item.content }
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

CarouselComponents.propTypes = {
  imgData: PropTypes.array,
  onTapItem: PropTypes.func,
  autoplay: PropTypes.bool,
};

CarouselComponents.defaultProps = {
  autoplay: false,
  imgData: [
    {
      content: '一',
    },
    {
      content: '二',
    },
    {
      content: '三',
    },
    {
      content: '四',
    },
    {
      content: '五',
    },
  ],
  onTapItem() {},
};

export default CarouselComponents;