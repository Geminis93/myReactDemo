import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import THREE from 'three.js';
import * as Dat from 'dat.gui';
import style from './index.scss';


const cx = classNames.bind(style);

class ThreeJsDemo extends PureComponent {
  state = {
    scene: null,
    camera: null,
    renderer: null,
  }
  componentDidMount() {
    this.initThree();
  }

  initThree() {
    const {
      clientWidth,
      clientHeight,
    } = this.threeDom;
    const scene = new THREE.Scene(); // 场景
    const camera = new THREE.PerspectiveCamera(75, clientWidth / clientHeight, 0.1, 1000); // 相机

    const renderer = new THREE.WebGLRenderer();
    renderer.antialias = true; // 抗锯齿
    renderer.autoClear = true; // 自动清除
    renderer.setClearColor( 0x0099ff ); // 渲染背景色
    renderer.setSize(clientWidth, clientHeight);
    this.threeDom.appendChild(renderer.domElement);


    this.setState({
      scene,
      camera,
      renderer,
    }, () => {
      this.addCube();
      this.setGui();
    })
  }

  addCube() {
    const { scene, camera, renderer } = this.state;
    // 创建立方体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // 立方体模型
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 }); // 立方体材质,颜色为随机色
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial); // 创建网格实例
    cube.name = 'cube';
    // 将立方体加入场景
    scene.add(cube);
    // 创建光源 ambientLight:环境光、directionalLight:平行光
    const ambientLight = new THREE.AmbientLight(0x404040);
    const directionalLight1 = new THREE.DirectionalLight(0xC0C090);
    const directionalLight2 = new THREE.DirectionalLight(0xC0C090);
    // 设置光源的位置
    directionalLight1.position.set(-300, -400, 300);
    directionalLight2.position.set(300, 400, -300);
    // 将光源加入场景
    scene.add(ambientLight);
    scene.add(directionalLight1);
    scene.add(directionalLight2);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();
  }

  setGui() {
    const { scene } = this.state;
    // const dat = new Dat.GUI();
    console.log(scene.getObjectByName('cube'));
  }

  render() {
    return (
      <div
        className={cx('three-js-style')}
        ref={refs => this.threeDom = refs} />
    );
  }
}

export default ThreeJsDemo;