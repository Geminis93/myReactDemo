import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import THREE from 'three.js';
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

  // 初始化创建three场景
  initThree() {
    // 创建场景
    const scene = new THREE.Scene();
    // 创建相机
    const camera = new THREE.PerspectiveCamera(45, this.threeDom.clientWidth / this.threeDom.clientHeight, 0.1, 10000);
    // 创建渲染器
    const webGLRenderer = new THREE.WebGLRenderer();
    // 配置相机
    camera.position.set(0, 200, 300);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // 配置渲染器
    webGLRenderer.antialias = true;
    webGLRenderer.setClearColor(0x050505);
    webGLRenderer.setSize(this.threeDom.clientWidth, this.threeDom.clientHeight);
    //开启阴影效果
    webGLRenderer.shadowMap.enabled = true;

    // 创建灯光
    const ambientLight = new THREE.AmbientLight({ color: 0x404040 });
    scene.add(ambientLight);

    // 添加光源
    const spotLight = new THREE.SpotLight(0xcccccc);
    spotLight.position.set(-50, 300, 10);
    spotLight.castShadow = true;
    //设置阴影分辨率
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add(spotLight);


    // 创建平面
    const planeGeometry = new THREE.PlaneGeometry(400, 400);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x6D6565 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // 绕 x轴旋转90度
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -10;
    plane.position.z = -80;
    scene.add(plane);

    // 创建球体
    const sphereGeometry = new THREE.SphereGeometry(5, 20, 20);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.y = 10;
    sphere.position.z = -30;
    sphere.castShadow = true;
    // scene.add(sphere);

    // 创建立方体
    const cubeGeometry = new THREE.CubeGeometry(20, 20, 20);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 10;
    cube.position.z = 0;
    cube.castShadow = true;
    scene.add(cube);

    const pivotPiont = new THREE.Object3D();
    pivotPiont.add(sphere);
    console.log('pivotPiont --- ', pivotPiont);
    cube.add(pivotPiont);

    // 把渲染的页面添加到div
    this.threeDom.append(webGLRenderer.domElement);


    function render() {
      // 让立方体 绕坐标轴旋转
      cube.rotation.y += 0.01;
      // 开始渲染
      webGLRenderer.render(scene, camera);
    }

    //加入动画效果
    function animate() {
      render();
      requestAnimationFrame(animate);
    }
    animate();
  }

  render() {
    return (
      <div
        className={cx('three-js-style-1')}
        ref={refs => this.threeDom = refs} />
    );
  }
}

export default ThreeJsDemo;