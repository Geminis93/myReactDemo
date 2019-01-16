import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './index.scss';
import WaterRipple from './water';
import KMp3 from '../../../assets/media/K.mp3';
import opacity from '../../../assets/images/dark-indoors-landscape-1578287.jpg';

const cx = classNames.bind(styles);

class IdeaIndex extends PureComponent {
  state = {
    waterRipple: null,
  }

  componentDidMount() {
    const {
      clientWidth,
      clientHeight,
    } = this.canvasDom.parentElement;
    const settings = {
      image: opacity, // image path
      dropRadius: 3, // radius of the source ripple
      width: clientWidth, // width
      height: clientHeight, // height
      delay: 3, // the time between auto disturb
      auto: 0, // true means auto disturb
    };
    const waterRipple = new WaterRipple(this.canvasDom, settings);
    const x = 100, y = 100;
    waterRipple.disturb(x, y);
    this.setState({
      waterRipple,
    });
  }

  animation(e) {
    const {
      offsetTop,
      offsetLeft,
    } = this.canvasDom.parentElement;
    const { waterRipple } = this.state;
    const mouseX = e.clientX - offsetLeft;
    const mouseY = e.clientY - offsetTop;
    waterRipple.disturb(mouseX, mouseY);
  }

  render() {
    return (
      <div>
        <div
          className={cx('idea-style')}
          onTouchMove={e => this.animation(e)}
          onClick={e => this.animation(e)}
          onMouseMove={e => this.animation(e)}>
          {/* 文字 */}
          <p>好久没看见雪了<br />只有春天和绣球花<br />开得盛呢盖着<br />我薄薄的屋顶<br />有人爱花有人爱人<br />有人爱雪<br />而我<br />却爱灰烬的纯洁提水看山看火被烟带走落叶纷纷绿荫长长<br />光束累累<br />阳光水和灰烬<br />一朵花的颜色<br />爱的三个季节</p>
          {/* 图片 */}
          <div
            className={cx('idea-style-img')}
            id="holder"
            ref={refs => (this.canvasDom = refs)} />
          {/* 音频 */}
          <audio src={KMp3} autoPlay />
        </div>
      </div>
    );
  }
}

export default IdeaIndex;