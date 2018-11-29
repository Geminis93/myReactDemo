import React, { Component } from "react";
import * as PIXI from "pixi.js";
import red from '../../assets/cude/7.png';
import white from '../../assets/cude/9.png';
import blue from '../../assets/cude/5.png';
import green from '../../assets/cude/4.png';
import black from '../../assets/cude/2.png';
import gray from '../../assets/cude/3.png';

const height = 450;
const width = 800;
const OPTIONS = {
  backgroundColor: 0x1099bb,
  antialias: true,
};

class PixiJs extends Component {
  constructor(props) {
    super(props);
    // 计算适配比例
    const scale = window.innerWidth / 750;

    this.state = {
      app: new PIXI.Application(width, height, OPTIONS),
    }
  }

  componentDidMount() {
    const { app } = this.state;
    this.dom.appendChild(app.view);

    PIXI.loader.add([
      {
        name: 'red',
        url: red,
      },
      {
        name: 'white',
        url: white,
      },
      {
        name: 'blue',
        url: blue,
      },
      {
        name: 'green',
        url: green,
      },
      {
        name: 'black',
        url: black,
      },
      {
        name: 'gray',
        url: gray,
      },
    ]).load(() => {
      this.setup();
    })
  }

  // 创建精灵
  createSprite(option) {
    const baseTexture = new PIXI.BaseTexture.fromImage(option);
    const load = new PIXI.Texture(baseTexture);
    const sprite = new PIXI.Sprite(load);
    return sprite;
  }

  setup() {
    const { app } = this.state;
    const wrap = new PIXI.Container();
    wrap.position.set(app.screen.width / 2, app.screen.height / 2);
    const red = new PIXI.Container();
    red.width = 100;
    red.height = 100;
    red.x = -100;
    let sprite = this.createSprite('red');
    sprite.width = 100;
    sprite.height = 100;
    const gray = new PIXI.Container();
    gray.width = 100;
    gray.height = 100;
    let graysprite = this.createSprite('gray');
    graysprite.anchor.set(0, 0);
    graysprite.width = 100;
    graysprite.height = 100;
    gray.addChild(graysprite);
    red.addChild(sprite);
    wrap.addChild(gray);
    wrap.addChild(red);
    app.stage.addChild(wrap);
  }

  render() {
    return (
      <div ref={refs => this.dom = refs}></div>
    );
  }
}

export default PixiJs;
