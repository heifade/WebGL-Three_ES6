import * as THREE from 'three';
import $ from "jquery";

 export default class QuarkUIIndex {
  constructor(container) {
    this.container = container;
    this.width = 1000;
    this.height = 600;
    this.initRenderer({width: this.width, height: this.height});//初始化渲染器
    this.initScene();//初始化场景
    this.initCamera();//初始化摄像机
    this.initLight();//初始化光源
    this.bigSphereRadius = 3000;//大球半径
    this.center = {x: 0, y: 0, z: -50000};
    this.drawBigSphere();
    this.objectSet = new Set();
    this.createObjects();
    this.createStar();//星星

    this.container.find('canvas')
      .css('background', 'url(../../pic/back.png) no-repeat center center')
      .css('background-size', '1000px, 600px');
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ //创建渲染器
      antialias: true, //抗据齿
      alpha:true, //背景透明
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor('#000000', 0.0);
    this.container.append(this.renderer.domElement);
  }

  initScene() { 
    this.scene = new THREE.Scene(); //创建场景
  }

  initCamera() {
    // 透视相机
    this.camera = new THREE.PerspectiveCamera(
      30, //视角(度)
      this.width / this.height, //纵横比,即平面长高比
      1, //最近距离
      100000 //最远距离
    );

    // 摄像头位置
    this.camera.position.set(0, 0, 1500);
    // 摄像头上方向
    this.camera.up.set(0, 1, 0);
    // 摄像头观察点
    this.camera.lookAt({ x: 0, y: 0, z: 0 });
  }

  initLight() {
    //点光源
    // this.pointLight = new THREE.PointLight("#ffffff", 1, 0, 1);
    // this.pointLight.position.set( 56000, 56000, -56000 );
    // this.scene.add(this.pointLight);

    this.spotLight = new THREE.SpotLight('#ffffff');
    this.spotLight.position.set( 56000, 56000, -50000 );
    this.scene.add(this.spotLight);

    this.mmbientLight = new THREE.AmbientLight('#111111');
    this.scene.add(this.mmbientLight);
  }

  // 渲染
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  moveObjects() {
    this.objectSet.forEach(group => {
      group.rotation.y += 0.002;
      let m = group.children[0];
      m.rotation[group.zn] += group.zv;

      let {x,y,z} = m.position;

      if(group.rotation.y / Math.PI * 180 > 80) {
        this.objectSet.delete(group);
        this.scene.remove(group);
        return;
      }

      // if(m.rotation.y > 1.5){
      //   this.objectSet.delete(group);
      //   this.scene.remove(group);
      //   return;
      // }
      //m.position.x = x + 4;
      //m.position.y = y > 0 ? y - p: y + p;
      //m.position.z = z - 83;

      //console.log(m.rotation.y, m.position.x, m.position.z);
    });
    this.render();
  }

  animate() {
    let I = this;
    function move() {
      I.moveObjects();

      I.starGroup.rotation.y += 0.001;

      if(I.meshBigSphere) {
        I.meshBigSphere.rotation.y += 0.02;
      }
      

      requestAnimationFrame(move);
    }
    move();
  }
  dispose(){}
  drawBigSphere() { //大球

    new THREE.TextureLoader().load('../../pic/QuarkPlanet.jpg',
      ( texture ) => {
        var material = new THREE.MeshLambertMaterial( {
          map: texture
        });

        let geometry = new THREE.SphereGeometry(
          this.bigSphereRadius, //球体半径
          50, // 球体横截面上的面个数，最小3，默认8
          50, // 球体纵截面上的上半部份面个数，最小2，默认6
          // this.data.phiStart / 180 * Math.PI,
          // this.data.phiLength / 180 * Math.PI,
          // this.data.thetaStart / 180 * Math.PI,
          // this.data.thetaLength / 180 * Math.PI,
        );
        //this.material1 = new THREE.MeshLambertMaterial({color: '#D0021B'});//材质
        //this.material1.wireframe = true;
        this.meshBigSphere = new THREE.Mesh(geometry, material);
        this.meshBigSphere.position.set(this.center.x, this.center.y + 1000, this.center.z);
        
        this.meshBigGroup = new THREE.Object3D();
        this.meshBigGroup.add(this.meshBigSphere);
        this.meshBigGroup.rotation.z = 0.5;

        this.scene.add(this.meshBigGroup);
      },
      function ( xhr ) {
      },
      function ( xhr ) {
      }
    );
  }

  createObjects() {
    let I = this;
    function create() {
      I.createObjectCube();
      I.createObjectSphere({s1: 1, s2: 1});
      I.createObjectSphere({s1: 3, s2: 3});
      I.createObjectSphere({s1: 5, s2: 5});
      I.createObjectSphere({s1: 10, s2: 10});
      I.createObjectCylinder();
      setTimeout(() => {
        create();
      }, 200);
    }
    create();
  }

  createObjectCube() {
    let geometry = new THREE.CubeGeometry(300 * Math.random(), //width
			300 * Math.random(), //height
      300 * Math.random(), //depth
		);
		let material = new THREE.MeshLambertMaterial({color: '#ffffff'});//材质
		let mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(50000 + Math.random() * 8000, 0, 45000);
    let group = new THREE.Object3D();
    group.position.set(this.center.x - 55000, 1500 * Math.random(), this.center.z);
    group.rotation.x = 2 / 180 * Math.PI;
    group.zn = 'x';
    group.zv = 0.3 * Math.random();
    this.scene.add(group);
    group.add(mesh);
    this.objectSet.add(group);
  }

  createObjectSphere({s1, s2}) {
    let geometry = new THREE.SphereGeometry(
      500 * Math.random(), //球体半径
      Math.floor(Math.random() * s1) + 3, // 球体横截面上的面个数，最小3，默认8
      Math.floor(Math.random() * s2) + 6, // 球体纵截面上的上半部份面个数，最小2，默认6
    );
    
		let material = new THREE.MeshLambertMaterial({color: '#ffffff'});//材质
		let mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(50000 + Math.random() * 8000, 0, 45000);
    let group = new THREE.Object3D();
    group.position.set(this.center.x - 55000, 1500 * Math.random(), this.center.z);
    group.rotation.x = 2 / 180 * Math.PI;
    group.zn = 'y';
    group.zv = 0.3 * Math.random();
    this.scene.add(group);
    group.add(mesh);
    this.objectSet.add(group);
  }

  createObjectCylinder() {
    let geometry = new THREE.CylinderGeometry(
      500 * Math.random(), // 圆柱顶半径
      500 * Math.random(), // 圆柱底半径
      500 * Math.random(), // 圆柱高度
      10, // 侧面个数
      10, //
      false, 
      0,
      Math.PI * 2,
    );
    
		let material = new THREE.MeshLambertMaterial({color: '#ffffff'});//材质
		let mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(50000 + Math.random() * 8000, 0, 45000);
    let group = new THREE.Object3D();
    group.position.set(this.center.x - 55000, 1500 * Math.random(), this.center.z);
    group.rotation.x = 2 / 180 * Math.PI;
    group.zn = 'z';
    group.zv = 0.3 * Math.random();
    this.scene.add(group);
    group.add(mesh);
    this.objectSet.add(group);
  }

  createStar() { //星星
    let geometry = new THREE.TorusKnotGeometry (
      20000, //radius
			5000, //tube 管子半径
			20, //radialSegments 
			20, //tubularSegments
    );
    
    let material = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 500,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: this.createStarTexture(),
    });

    let system1 = new THREE.Points(geometry, material);
    system1.sortParticles = true;
    //system1.position.set(0,0,0);

    this.starGroup = new THREE.Object3D();
    this.starGroup.position.set(0,0, -20000);
    this.starGroup.add(system1); 

    this.scene.add(this.starGroup);
  }

  createStarTexture() { //星星纹理
    let canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    let context = canvas.getContext('2d');
    let gradient = context.createRadialGradient(
      canvas.width / 2, canvas.height / 2,
      0,
      canvas.width / 2, canvas.height / 2,
      canvas.width / 2
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(0.4, 'rgba(0,0,64,0.6)');
    gradient.addColorStop(1, 'rgba(25,25,25,0.1)');
    context.fillStyle = gradient;
    context.fillRect(0,0,canvas.width, canvas.height);

    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  

  

}



