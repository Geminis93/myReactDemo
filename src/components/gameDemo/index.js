import React, { Component } from "react";
import * as PIXI from "pixi.js";
import './index.scss';

class GameDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: 1,
      view: null,
    }
  }

  componentDidMount() {
    window.onresize = () => {
      this.getScale();
    };
    setTimeout(() => {
      this.initPIXI();
    }, 0);
  }
  // 初始化画布
  initPIXI() {
    const { scale } = this.state;
    const view = new PIXI.Application({
      width: 1024 * scale,
      height: 720 * scale,
      backgroundColor: 0x1099bb,
      antialias: true,
    });
    this.setState({
      view,
    })
    this.dom.appendChild(view.view);
  }
  // 自适应
  getScale() {
    const { view } = this.state;
    const width = this.gameBox.clientWidth;
    const scale = width / 1024;
    console.log('scale --- ', scale);
    this.setState({
      scale,
    })
    view.renderer.resize(1024 * scale, 720 * scale);
    return scale;
  }
  // 图片缓存
  // 动画的开始与暂停

  render() {
    return (
      <div ref={refs => this.gameBox = refs}>
        <div ref={refs => this.dom = refs}></div>
      </div>
    );
  }
}

export default GameDemo;