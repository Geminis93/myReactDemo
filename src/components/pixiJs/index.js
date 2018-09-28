import React, { Component } from "react";
import { Stage, Sprite } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const height = 450;
const width = 800;
const OPTIONS = {
  backgroundColor: 0x1099bb
};
const bunny = "https://i.imgur.com/IaUrttj.png";
const centerAnchor = new PIXI.Point(0.5, 0.5);

class PixiJs extends Component {
  render() {
    return (
      <Stage options={OPTIONS} width={width} height={height}>
        <Sprite
          anchor={centerAnchor}
          texture={PIXI.Texture.fromImage(bunny)}
          x={400}
          y={225}
        />
      </Stage>
    );
  }
}

export default PixiJs;
