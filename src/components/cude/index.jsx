import React, { Component } from "react";
import * as PIXI from "pixi.js";
import red from '../../assets/cude/7.png';
import white from '../../assets/cude/9.png';
import blue from '../../assets/cude/5.png';
import green from '../../assets/cude/4.png';
import black from '../../assets/cude/2.png';
import gray from '../../assets/cude/3.png';

const height = 400;
const width = 400;
const OPTIONS = {
  backgroundColor: 0x1099bb,
  antialias: true,
};

const fallLength = 500;
var Vector = function(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
  this._get2d = function() {
    var scale = fallLength / (fallLength + this.z);
    var x = (width / 2) + this.x * scale;
    var y = (height / 2) + this.y * scale;
    return { x: x, y: y };
  }
}

var Cube = function(length) {
  this.length = length;
  this.faces = [];
}
Cube.prototype = {
  _initVector: function() {
    this.vectors = [];
    this.vectors.push(new Vector(-this.length / 2, -this.length / 2, this.length / 2)); //0
    this.vectors.push(new Vector(-this.length / 2, this.length / 2, this.length / 2)); //1
    this.vectors.push(new Vector(this.length / 2, -this.length / 2, this.length / 2)); //2
    this.vectors.push(new Vector(this.length / 2, this.length / 2, this.length / 2)); //3

    this.vectors.push(new Vector(this.length / 2, -this.length / 2, -this.length / 2)); //4
    this.vectors.push(new Vector(this.length / 2, this.length / 2, -this.length / 2)); //5
    this.vectors.push(new Vector(-this.length / 2, -this.length / 2, -this.length / 2)); //6
    this.vectors.push(new Vector(-this.length / 2, this.length / 2, -this.length / 2)); //7

  },
  _draw: function() {
    this.faces[0] = new Face(this.vectors[0], this.vectors[1], this.vectors[3], this.vectors[2], "0x66cc66");
    this.faces[1] = new Face(this.vectors[2], this.vectors[3], this.vectors[5], this.vectors[4], "0x66cccc");
    this.faces[2] = new Face(this.vectors[4], this.vectors[5], this.vectors[7], this.vectors[6], "0xcccc66");
    this.faces[3] = new Face(this.vectors[6], this.vectors[7], this.vectors[1], this.vectors[0], "0xcc66cc");
    this.faces[4] = new Face(this.vectors[1], this.vectors[3], this.vectors[5], this.vectors[7], "0x666666");
    this.faces[5] = new Face(this.vectors[0], this.vectors[2], this.vectors[4], this.vectors[6], "0xcccccc");

    this.faces.sort(function(a, b) {
      return b.zIndex - a.zIndex;
    });
    const list = this.faces.map((item) => {
      return item.draw();
    })
    return list;
  }
}

var Face = function(vector1, vector2, vector3, vector4, color) {
  this.v1 = vector1;
  this.v2 = vector2;
  this.v3 = vector3;
  this.v4 = vector4;
  this.color = color;
  this.zIndex = this.v1.z + this.v2.z + this.v3.z + this.v4.z;
  this.draw = function() {
    const g = new PIXI.Graphics();
    g.beginFill(this.color);
    g.moveTo(this.v1._get2d().x, this.v1._get2d().y);
    g.lineTo(this.v2._get2d().x, this.v2._get2d().y);
    g.lineTo(this.v3._get2d().x, this.v3._get2d().y);
    g.lineTo(this.v4._get2d().x, this.v4._get2d().y);
    g.endFill();
    return g;
  }
}

var angleX = 0.8;
var angleY = 0.8;

function rotateX(vectors) {
  var cos = Math.cos(angleX);
  var sin = Math.sin(angleX);
  vectors.forEach(function(item) {
    var y1 = item.y * cos - item.z * sin;
    var z1 = item.z * cos + item.y * sin;
    item.y = y1;
    item.z = z1;
  });
}

function rotateY(vectors) {
  var cos = Math.cos(angleY);
  var sin = Math.sin(angleY);
  vectors.forEach(function(item) {
    var x1 = item.x * cos - item.z * sin;
    var z1 = item.z * cos + item.x * sin;
    item.x = x1;
    item.z = z1;
  })
}

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

    PIXI.loader.add(
      [
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
      ]
    ).load((loader, resources) => {
      this.setup(resources);
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
    /* const wrap = new PIXI.Container();
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
    gray.addChild(graysprite);
    red.addChild(sprite);
    wrap.addChild(gray);
    wrap.addChild(red); */
    const cube = new Cube(200);
    cube._initVector();
    rotateY(cube.vectors);
    rotateX(cube.vectors);
    const list = cube._draw();

    const animate = () => {
      console.log(1);
      // ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      rotateY(cube.vectors);
      rotateX(cube.vectors);
      cube._draw();
      // requestAnimationFrame(animate);
    }

    animate();

    list.map((item) => {
      /* const { width, height, top, left } = item.getBounds();
      let graysprite = this.createSprite('gray');
      graysprite.width = 100;
      graysprite.height = 100;
      graysprite.x = left;
      graysprite.y = top;
      item.addChild(graysprite); */
      app.stage.addChild(item);
    });
  }

  render() {
    return (
      <div ref={refs => this.dom = refs}></div>
    );
  }
}

export default PixiJs;
