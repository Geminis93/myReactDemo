import React, { Component } from "react";
import * as PIXI from "pixi.js";
import bkg from '../../assets/images/bkg.jpg';
import bunny from '../../assets/images/bunny.png';

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
      name,
      type = 'rect',
      x = 0,
      y = 0,
      width = 100,
      height = 100,
      color = 0x000000,
      alpha = 1,
      borderRadius = 0,
      interactive = false,
      buttonMode = false,
    } = info;
    const drawTypeMap = {
      roundedRect: 'drawRoundedRect',
      rect: 'drawRect',
    };
    const drawType = drawTypeMap[type];
    const graphics = new PIXI.Graphics();
    graphics.name = name;
    graphics.beginFill(color, alpha);
    graphics[drawType](x, y, width, height, borderRadius);
    graphics.x = x;
    graphics.y = y;
    graphics.interactive = interactive;
    graphics.buttonMode = buttonMode;
    graphics.endFill();
    return graphics;
  }

  // 缓存图片
  loaderImage(option) {
    const loader = PIXI.loader.add(option);
    return loader;
  }

  // 创建精灵
  createSprite(option) {
    const load = PIXI.loader.resources[option].texture;
    const sprite = new PIXI.Sprite(load);
    return sprite;
  }

  componentDidMount() {
    const view = this.initPixi(1000, 800);
    this.setState({
      view,
    });
    this.dom.append(view.view);
    setTimeout(() => {
      this.drawView();
    }, 0);
  }

  // 绘制 view
  drawView() {
    const { view } = this.state;
    this.loaderImage([
      {
        name: 'bkg',
        url: bkg,
      },
      {
        name: 'bunny',
        url: bunny,
      }
    ]).load(() => {
      /* const bg = this.createSprite('bkg');
      bg.alpha = 0.1;
      view.stage.addChild(bg);
      setTimeout(() => {
        bg.alpha = 0.5;
      }, 1000); */

      // 模拟赌桌
      const desk = this.createGraphics({
        name: 'desk',
        type: 'roundedRect',
        x: 50,
        y: 100,
        width: 800,
        height: 400,
        borderRadius: 200,
        color: 0xFF9933,
      });
      const desk1 = this.createGraphics({
        name: 'desk1',
        type: 'roundedRect',
        x: 50,
        y: 100,
        width: 800,
        height: 400,
        borderRadius: 200,
        alpha: 0.1
      });
      const left = this.createGraphics({
        x: 100,
        y: 125,
        width: 250,
        height: 300,
        color: 0xFFFFFF,
        alpha: 0.1,
        interactive: true,
      });
      left.on('click', () => {
        console.log('1');
      });
      const right = this.createGraphics({
        x: 275,
        y: 125,
        width: 250,
        height: 300,
        color: 0xFFFFFF,
        alpha: 0.1,
        interactive: true,
      });
      right.on('click', () => {
        console.log('2');
      });
      view.stage.addChild(desk);
      view.stage.addChild(desk1);
      view.stage.addChild(left);
      view.stage.addChild(right);
    });
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