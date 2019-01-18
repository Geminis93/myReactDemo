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
      showNumber: 1,
      moveX: null,
      interval: null,
      scale: 1,
      list: [
        imgData[imgData.length - 1],
        ...imgData,
        imgData[0],
        imgData[1],
      ],
    };
  }

  componentDidMount() {
    const { autoplay } = this.props;
    autoplay && this.autoPlay();
    const width = this.carouselItem0.clientWidth;
    const scale = width / 448;
    this.setState({
      scale,
    });
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
          number = list.length - 3;
          break;
        case list.length - 2:
          number = 1;
          break;
        default:
          break;
      }
      setTimeout(() => {
        this.setState({
          showNumber: number,
        });
      }, 500);
    });
  }

  onTouchStart = (e) => {
    // e.preventDefault();
    if ((e.touches && e.touches.length > 1) || this.length <= 1) {
      return;
    }
    const { interval } = this.state;
    clearInterval(interval);
    this.startX = e.pageX || e.touches[0].pageX;
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
    // e.preventDefault();
    if ((e.changedTouches && e.changedTouches.length > 1) || this.length <= 1 || !this.startX) {
      return;
    }

    const { autoplay } = this.props;
    const { showNumber } = this.state;
    const x = e.pageX || e.changedTouches[0].pageX;
    const differ = x - this.startX;

    this.startX = null;
    this.setState({
      moveX: null,
    }, () => {
      const number = Math.abs(differ) > 250 ? showNumber + (differ > 0 ? -1 : 1) : showNumber;
      this.onSetNumber(number);
      autoplay && this.autoPlay();
    });
  }

  render() {
    const { onTapItem } = this.props;
    const { showNumber, moveX, list, scale } = this.state;
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
              const x = (550 * scale) * (index - showNumber);
              const z = index > 0 ? (-100 * scale) * (index - showNumber) : (100 * scale);
              const style1 = moveX !== null ? {
                left: `${x + moveX}px`,
                WebkitTransform: `translateZ(${z - (moveX / 4)}px)`,
                transform: `translateZ(${z - (moveX / 4)}px)`,
              } : {
                  WebkitTransition: 'all 0.5s',
                };
              return (
                <li
                  ref={refs => (this[`carouselItem${index}`] = refs)}
                  key={index}
                  onClick={e => onTapItem(item, index, e)}
                  className={cx(
                    'carousel-style-item',
                    {
                      'carousel-style-item-nth0': showNumber - 1 === index,
                      'carousel-style-item-nth1': showNumber === index,
                      'carousel-style-item-nth2': showNumber + 1 === index,
                      'carousel-style-item-nth3': showNumber + 2 === index,
                    },
                  )}
                  style={style1}>
                  { item.link }
                  {/* <img src={item.imgUrl} /> */}
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
      "id": 83,
      "imgUrl": "http://gold2-vnet-img.qa01.goldtoken88.io/turns/o/20190104/60881546593426671.jpg",
      "imgUrlShrink": "http://gold2-vnet-img.qa01.goldtoken88.io/turns/s/20190104/60881546593426671.jpg",
      "link": "1",
    },
    {
      "id": 84,
      "imgUrl": "http://gold2-vnet-img.qa01.goldtoken88.io/turns/o/20190104/52831546593443388.jpg",
      "imgUrlShrink": "http://gold2-vnet-img.qa01.goldtoken88.io/turns/s/20190104/52831546593443388.jpg",
      "link": "2",
    },
    { "id": 85,
      "imgUrl": "http://gold2-vnet-img.qa01.goldtoken88.io/turns/o/20190104/23591546593481826.jpg",
      "imgUrlShrink": "http://gold2-vnet-img.qa01.goldtoken88.io/turns/s/20190104/23591546593481826.jpg",
      "link": "3",
    },
    { "id": 84,
      "imgUrl": "http://gold2-vnet-img.qa01.goldtoken88.io/turns/o/20190104/39861546593498241.jpg",
      "imgUrlShrink": "http://gold2-vnet-img.qa01.goldtoken88.io/turns/s/20190104/39861546593498241.jpg",
      "link": "4",
    },
    { "id": 85,
      "imgUrl": "http://gold2-vnet-img.qa01.goldtoken88.io/turns/o/20190104/6221546593511805.jpg",
      "imgUrlShrink": "http://gold2-vnet-img.qa01.goldtoken88.io/turns/s/20190104/6221546593511805.jpg",
      "link": "5",
    }
  ],
  onTapItem() { },
};

export default CarouselComponents;
