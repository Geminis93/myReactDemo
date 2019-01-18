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
    guiInfo: {
      cubeX: 0.1,
      cubeY: 0.2,
      rendererColor: 0x0099ff,
      cameraX: 0,
      cameraY: 0,
      cameraZ: 0,
    },
  }
  componentDidMount() {
    this.initThree();
  }

  // 初始化创建three场景
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
    renderer.setClearColor(0x0099ff); // 渲染背景色
    renderer.setSize(clientWidth, clientHeight);
    this.threeDom.appendChild(renderer.domElement);


    this.setState({
      scene,
      camera,
      renderer,
    }, () => {
      this.addCube();
      // this.setGui();
    })
  }

  // 添加立方体
  addCube() {
    const { scene, camera, renderer, guiInfo } = this.state;
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

      cube.rotation.x += guiInfo.cubeX;
      cube.rotation.y += guiInfo.cubeY;

      renderer.render(scene, camera);
    };
    animate();
  }

  // 添加调试工具
  setGui() {
    const { renderer, guiInfo, camera } = this.state;
    const dat = new Dat.GUI();
    

    dat.add(guiInfo, "cubeX", 0, 1);
    dat.add(guiInfo, "cubeY", 0, 1);
    dat.add(guiInfo, "cameraX", 0, 10).step(0.5).onChange((e) => {
      camera.position.x = e;
    });
    dat.add(guiInfo, "cameraY", 0, 10).step(0.5).onChange((e) => {
      camera.position.y = e;
    });
    dat.add(guiInfo, "cameraZ", 0, 10).step(0.5).onChange((e) => {
      camera.position.z = e;
    });
    dat.addColor(guiInfo, "rendererColor", 0x0099ff).onChange((e) => {
      renderer.setClearColor(e); // 渲染背景色
    });
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