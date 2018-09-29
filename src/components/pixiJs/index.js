import React, { Component } from "react";
import { Stage, Sprite, render, Text } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

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
    rotation: 0,
    x: 100,
  }

  componentDidMount() {
    const { app, app1 } = this.state;
    app.ticker.add(this.animate);
    this.dom.appendChild(app.view);
    this.dom.appendChild(app1.view);
    this.setApp1();
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
    const surface = new PIXI.Sprite(new PIXI.Texture.fromImage("https://pixijs.io/examples/required/assets/bkg.jpg"));
    surface.anchor.set(0.5, 1);
    surface.width = app1.screen.width;
    surface.height = app1.screen.height;

    app1.stage.addChild(container);
    container.addChild(surface);
    console.log('container ----- ', container.proj)
  }

  render() {
    const { app, rotation, x } = this.state;
    /* 2 */
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
