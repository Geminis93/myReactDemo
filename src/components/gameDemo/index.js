import React, { Component } from "react";
import * as PIXI from "pixi.js";
import bkg from '../../assets/images/bkg.jpg';
import './index.scss';

class GameDemo extends Component {
  constructor(props) {
    super(props);
    // 图片缓存
    
    this.state = {
      scale: 1,
      view: null,
    }
  }

  componentDidMount() {
    // 自适应屏幕大小
    window.onresize = () => {
      this.setState({
        scale: this.setScale(),
      }, () => {
        const { view, scale } = this.state;
        if (view) {
          view.renderer.resize(1024 * scale, 720 * scale);
          const root = view.stage.getChildByName('root');
          root.scale.x = scale;
          root.scale.y = scale;
        }
      })
    };
    this.setState({
      scale: this.setScale(),
    }, () => {
      this.initPIXI();
    });
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
    }, () => {
      this.dom.appendChild(view.view);
      if (!PIXI.BaseTexture.fromImage('bg').hasLoaded) {
        PIXI.loader.add([
          {
            name: 'bg',
            url: bkg,
          },
        ]).load(() => {
          this.draw();
        })
      } else {
        this.draw();
      }
    });
  }
  // 设置画布宽度比例
  setScale() {
    const width = this.gameBox.clientWidth;
    const scale = width / 1024;
    return scale;
  }

  // 设置Sprite
  setSprite(name) {
    const baseTexture = new PIXI.BaseTexture.fromImage(name);
    const texture = new PIXI.Texture(baseTexture);
    const sprite = new PIXI.Sprite(texture);
    return sprite;
  }

  // 绘制内容
  draw() {
    const { view, scale } = this.state;
    // root 
    const container = new PIXI.Container();
    container.name = 'root';
    container.scale.x = scale;
    container.scale.y = scale;
    // 背景
    const bg = this.setSprite('bg');
    container.addChild(bg);
    view.stage.addChild(container);
  }
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