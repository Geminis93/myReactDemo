import React, { Component } from "react";
import * as PIXI from "pixi.js";

class GameDemo extends Component {
  state = {
    view: null,
  };

  // 初始化 Pixi应用
  initPixi(width, height, option) {
    const w = width || 800;
    const h = height || 450;
    const o = option || {
      backgroundColor: 0x1099bb,
    };

    return new PIXI.Application(w, h, o);
  }

  // 创建容器
  createContainer() {

  }

  // 创建图形
  createGraphics(info) {
    const {
      type,
      x,
      y,
      width,
      height,
      color,
      alpha,
      borderRadius,
    } = info;
    const drawTypeMap = {
      roundedRect: 'drawRoundedRect',
      rect: 'drawRect',
    };
    const drawType = drawTypeMap[type];
    const graphics = new PIXI.Graphics();
    graphics.beginFill(color, alpha);
    graphics[drawType](x, y, width, height, borderRadius);
    graphics.x = x;
    graphics.y = y;
    graphics.endFill();
    return graphics;
  }

  componentDidMount() {
    const view = this.initPixi(1000, 800);
    this.setState({
      view,
    });
    this.dom.append(view.view);
  }

  render() {
    return (
      <div>
        <div ref={refs => this.dom = refs}></div>
      </div>
    );
  }
}

export default GameDemo;