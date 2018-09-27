import React from 'react';
import { Sprite, Stage } from "react-pixi-fiber";
import PIXI from "pixi.js";

const height = 450;
const width = 600;
const OPTIONS = {
  backgroundColor: 0x1099bb,
};
const bunny = "https://i.imgur.com/IaUrttj.png";
const centerAnchor = new PIXI.Point(0.5, 0.5);

function PixiJs() {

  console.log('pixi ---- ', PIXI);

  return (
    <Stage options={OPTIONS} width={width} height={height}>
      <Sprite
        anchor={centerAnchor}
        texture={PIXI.Texture.fromImage(bunny)}
        x={200} y={200}
      />
    </Stage>
  )
}

export default PixiJs;