import React, { Component } from "react";
import { Stage, Sprite, render, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import bkg from '../../assets/images/bkg.jpg';
import audio from './audio.mp3';

const height = 450;
const width = 800;
const OPTIONS = {
  backgroundColor: 0x1099bb,
  // view: document.getElementById('dom')
};
const bunny = "https://i.imgur.com/IaUrttj.png";
const centerAnchor = new PIXI.Point(0.5, 0.5);

class PixiJs extends Component {
  state = {
    app: new PIXI.Application(width, height, OPTIONS),
    app1: new PIXI.Application(width, height, OPTIONS),
    game: new PIXI.Application(width, height, OPTIONS),
    rotation: 0,
    x: 100,
    info: null,
    domFlag: false,
  }

  componentDidMount() {
    const { app, app1, game } = this.state;
    app.ticker.add(this.animate);
    // this.setApp1();
    this.gameDemo();
    this.dom.appendChild(app.view);
    // this.dom.appendChild(app1.view);
    this.dom.appendChild(game.view);
  }

  animate = delta => {
    const { app } = this.state;
    this.setState(state => ({
      ...state,
      rotation: state.rotation + 0.1 * delta,
      x: state.x > app.screen.width ? 0 : state.x + 5 * delta,
    }));
  }

  setApp1() {
    const { app1 } = this.state;
    const container = new PIXI.Container();
    container.position.set(app1.screen.width / 2, app1.screen.height);
    const surface = new PIXI.Sprite(new PIXI.Texture.fromImage(bkg));
    surface.anchor.set(0.5, 1);
    surface.width = app1.screen.width;
    surface.height = app1.screen.height;
    surface.alpha = 0.5; // 透明度
    // spr
    const spr = new PIXI.Sprite(new PIXI.Texture.fromImage(bunny));
    spr.anchor.set(0, 0);
    spr.x = 400;
    spr.y = 400;

    // spr1
    const spr1 = new PIXI.Sprite(new PIXI.Texture.fromImage(bunny));
    spr1.anchor.set(0, 0);
    spr1.x = 400;
    spr1.y = 400;
    spr1.alpha = 1;
    app1.stage.addChild(container);
    container.addChild(surface);

    // 矩形
    let rectangle = new PIXI.Graphics();
    rectangle.lineStyle(1, 0xFF3300, 0.5);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, 60, 60);
    rectangle.endFill();
    rectangle.x = 80;
    rectangle.y = 195;
    app1.stage.addChild(rectangle);

    
    // 矩形
    let rectangle1 = new PIXI.Graphics();
    rectangle1.lineStyle(1, 0xFF3300, 0.5);
    rectangle1.beginFill(0x66CCFF);
    rectangle1.drawRect(0, 0, 60, 60);
    rectangle1.endFill();
    rectangle1.x = 670;
    rectangle1.y = 195;
    app1.stage.addChild(rectangle1);

    app1.stage.addChild(spr);
    app1.stage.addChild(spr1);
    let flag = false;
    let flag1 = false;

    const addFn = (delta) => {
      // spr.rotation = spr.rotation - 0.1 * delta;
      spr.x = spr.x - (flag ? 1 : 5);
      spr.y = spr.y - (flag ? 1 : 3);

      if (this.hitTestRectangle(spr, rectangle)) {
        flag = true;
        if (spr.x <= 100 || spr.y <= 210) {
          setTimeout(() => {
            spr.x = 400;
            spr.y = 400;
            flag = false;
            app1.ticker.add(addFn);
          }, 3000)
          app1.ticker.remove(addFn);
        }
        /* spr.x = 120;
        spr.y = 210;
        app1.ticker.remove(addFn); */
      }
    }

    const addFn1 = (delta) => {
      spr1.x = spr1.x + (flag1 ? 1 : 5);
      spr1.y = spr1.y - (flag1 ? 1 : 3);
      spr1.alpha = !flag1 ? spr1.alpha : spr1.alpha - 0.05;

      if (this.hitTestRectangle(spr1, rectangle1)) {
        flag1 = true;
        
        if (spr1.x >= 700 || spr1.y <= 210) {
          setTimeout(() => {
            spr1.x = 400;
            spr1.y = 400;
            flag1 = false;
            spr1.alpha = 1;
            app1.ticker.add(addFn1);
          }, 3000)
          app1.ticker.remove(addFn1);
        }
      }
    }

    app1.ticker.add(addFn);
    app1.ticker.add(addFn1);
  }

  /**
   * 移动到左右
   */
  gameTrcker(item, hitDom, times) {
    // 判断 y轴位置
    if (item.isFirst) {
      const x = !!times ? hitDom.x + 50 : hitDom.x;
      const y = !!times ? hitDom.y + 50 : hitDom.y;

      item.isFirst = !item.isFirst;
      item.vx = (x - item.x) / 90;
      item.vy = (y - item.y) / 90;
    }

    item.x += item.vx;
    item.y += item.vy;
    if (times) {
      item.alpha = this.hitTestRectangle(item, hitDom) ? item.alpha - (1 / times) : item.alpha;
    }
  }

  /**
   * 修改移动的左右位置
   */
  onChangeFlag = str => () => {
    this.setState({
      domFlag: str === 'left',
    });
  }

  /**
   * 触发 收 移动
   */
  onStart() {
    const { game, domFlag, info } = this.state;
    const { list, itemContainer, left, right } = info;
    itemContainer.children.map((item, i) => {
      item.isFirst = true;
      item.vx = 0;
      item.vy = 0;
      item.x = list[i].x;
      item.y = list[i].y;
      item.alpha = 1;
      return item;
    });
    
    let times = 90;
    console.log(game.ticker);
    game.ticker.add(() => {
      const dom = domFlag ? left : right;
      if (times > 0) {
        times -= 1;
        itemContainer.children.forEach(item => this.gameTrcker(item, dom, times));
      } else {
        game.ticker.remove(() => {
          itemContainer.children.forEach(item => this.gameTrcker(item, dom, times));
        })
      }
    });
  }

  /**
   * 触发 放 移动
   */
  onStart1() {
    const { game, domFlag, info } = this.state;
    const { list, itemContainer, left, right } = info;
    const dom = domFlag ? left : right;
    itemContainer.children.map(item => {
      item.isFirst = true;
      item.vx = 0;
      item.vy = 0;
      item.x = dom.x + 50;
      item.y = dom.y + 50;
      item.alpha = 1;
      return item;
    });
    
    let times = 90;
    const now = new Date().getTime();
    const add = now + 1000;
    game.ticker.speed = 2;
    console.log(game.ticker);
    game.ticker.add(() => {
      if (new Date().getTime() <= add) {
        console.log(1);
        times -= 1;
        itemContainer.children.forEach((item, i) => this.gameTrcker(item, list[i]));
      } else {
        game.ticker.remove(() => {
          itemContainer.children.forEach((item, i) => this.gameTrcker(item, list[i]));
        })
      }
    });
  }

  gameDemo() {
    const { game, domFlag } = this.state;

    const list = [
      {
        x: 0,
        y: 0,
      },
      {
        x: 400,
        y: 400,
      },
      {
        x: 0,
        y: 400,
      },
      {
        x: 400,
        y: 0,
      },
      {
        x: 750,
        y: 0,
      },
      {
        x: 750,
        y: 400,
      },
    ];
    // 添加桌子
    const desk = new PIXI.Graphics();
    desk.beginFill(0xFF9933);
    desk.drawRoundedRect(100, 75, 600, 300, 150);
    game.stage.addChild(desk);
    // 添加层
    const itemContainer = new PIXI.Container();
    game.stage.addChild(itemContainer);

    const left = new PIXI.Graphics();
    left.beginFill(0x66CCFF, 0.1);
    left.drawRect(0, 0, 100, 100);
    left.endFill();
    left.x = 200;
    left.y = 175;
    left.interactive = true;
    left.buttonMode = true;
    left.on('click', this.onChangeFlag('left'));
    game.stage.addChild(left);

    const leftText = new PIXI.Text('Left');
    leftText.position.set(225, 210);
    game.stage.addChild(leftText);

    const right = new PIXI.Graphics();
    right.beginFill(0x66CCFF, 0.1);
    right.drawRect(0, 0, 100, 100);
    right.endFill();
    right.x = 500;
    right.y = 175;
    right.interactive = true;
    right.buttonMode = true;
    right.on('click', this.onChangeFlag('right'));
    game.stage.addChild(right);

    const center = new PIXI.Graphics();
    center.beginFill(0x66CCFF);
    center.drawRect(0, 0, 40, 20);
    center.endFill();
    center.x = 350;
    center.y = 215;
    center.interactive = true;
    center.buttonMode = true;
    center.on('click', () => this.onStart());
    game.stage.addChild(center);
    
    const centerText = new PIXI.Text('收');
    centerText.position.set(360, 205);
    game.stage.addChild(centerText);

    const center2 = new PIXI.Graphics();
    center2.beginFill(0x66CCFF);
    center2.drawRect(0, 0, 40, 20);
    center2.endFill();
    center2.x = 400;
    center2.y = 215;
    center2.interactive = true;
    center2.buttonMode = true;
    center2.on('click', () => this.onStart1());
    game.stage.addChild(center2);
    
    const center2Text = new PIXI.Text('放');
    center2Text.position.set(410, 205);
    game.stage.addChild(center2Text);

    const rightText = new PIXI.Text('Right');
    rightText.position.set(525, 210);
    game.stage.addChild(rightText);

    // 添加人
    for (let i = 0; i < list.length; i ++) {
      const spr = new PIXI.Sprite(new PIXI.Texture.fromImage(bunny));
      spr.anchor.set(0, 0);
      spr.x = list[i].x;
      spr.y = list[i].y;
      spr.isFirst = true;
      spr.vx = 0;
      spr.vy = 0;
      spr.alpha = 1;

      itemContainer.addChild(spr);
    }

    this.setState({
      info: {
        list,
        itemContainer,
        left,
        right,
      }
    })

    // this.onStart();
    /* let times = 90;
    game.ticker.add(() => {
      const dom = domFlag ? left : right;
      if (times > 0) {
        times -= 1;
        itemContainer.children.forEach(item => this.gameTrcker(item, dom, times));
      } else {
        game.ticker.remove(() => {
          itemContainer.children.forEach(item => this.gameTrcker(item, dom, times));
        })
      }
    }); */
  }

  // 碰撞函数
  hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  
    //hit will determine whether there's a collision
    hit = false;
  
    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;
  
    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
  
    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
  
    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  
    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
  
      //A collision might be occuring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
  
        //There's definitely a collision happening
        hit = true;
      } else {
  
        //There's no collision on the y axis
        hit = false;
      }
    } else {
  
      //There's no collision on the x axis
      hit = false;
    }
  
    //`hit` will be either `true` or `false`
    return hit;
  };

  render() {
    const { app, rotation, x } = this.state;
    /* 2 */
    // this.setApp1();
    render(
      [
        <Text key="text" text="Hello World!" x={200} y={200} />,
        <Sprite
          key="Sprite"
          anchor={centerAnchor}
          texture={PIXI.Texture.fromImage(bunny)}
          rotation={rotation}
          x={x}
          y={225}
        />,
        <Sprite
          key="Sprite1"
          anchor={centerAnchor}
          texture={PIXI.Texture.fromImage(bunny)}
          rotation={rotation}
          x={x}
          y={200}
        />,
      ]
    , app.stage);
    return (
      <div ref={refs => this.dom = refs}>
        <div>
          <audio ref={(audio) => { this.audioDom = audio; }} src={audio}>
            您的浏览器不支持 audio 元素
          </audio>
        </div>
        {/* 1 */}
        {/* <Stage ref={refs => this.StageDom = refs} options={OPTIONS} width={width} height={height}>
          <Sprite
            anchor={centerAnchor}
            texture={PIXI.Texture.fromImage(bunny)}
            x={400}
            y={225}
          />
        </Stage> */}
      </div>
    );
  }
}

export default PixiJs;
