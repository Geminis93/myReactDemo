import React, { Component } from "react";
import { Stage, Sprite, render } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const height = 450;
const width = 800;
const OPTIONS = {
  backgroundColor: 0x1099bb,
  view: document.getElementById('dom')
};
const bunny = "https://i.imgur.com/IaUrttj.png";
const centerAnchor = new PIXI.Point(0.5, 0.5);

class PixiJs extends Component {
  state = {
    app: new PIXI.Application(width, height, OPTIONS),
    rotation: 0,
    x: 100,
  }

  componentDidMount() {
    const { app } = this.state;
    app.ticker.add(this.animate);
    this.dom.appendChild(app.view);
  }

  animate = delta => {
    this.setState(state => ({
      ...state,
      rotation: state.rotation + 0.1 * delta,
      x: state.x > 700 ? 100 : state.x + 1 * delta,
    }));
  }

  render() {
    const { app, rotation, x } = this.state;
    /* 2 */
    render(<Sprite
      anchor={centerAnchor}
      texture={PIXI.Texture.fromImage(bunny)}
      rotation={rotation}
      x={x}
      y={225}
    />, app.stage);
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
