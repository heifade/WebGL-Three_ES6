import * as THREE from 'three';
import Base from './Base';

// 粒子
export default class Particle extends Base {
	constructor(container, $control){
    super(container, $control, {
      backgroundColor: '#000000',
    });

    this.data = {
			radius: 500,
			tube: 200, 
      radialSegments: 227,
			tubularSegments: 60,
			p: 2,//几何体绕旋转对称轴旋转多少次
			q: 3,//几何体绕圆环面内部绕一圈的次数
		}

    this.draw();

    this.ctrlBar.addControlRange({ title: `圆环半径`, hashData: this.data, key: "radius",  max: 1000, min: 10, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlRange({ title: `管子直径`, hashData: this.data, key: "tube",  max: 1000, min: 10, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlRange({ title: `管子分段`, hashData: this.data, key: "radialSegments",  max: 1000, min: 3, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlRange({ title: `圆环分段`, hashData: this.data, key: "tubularSegments",  max: 500, min: 0, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlRange({ title: `圆心旋转`, hashData: this.data, key: "p",  max: 10, min: 0, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlRange({ title: `环面旋转`, hashData: this.data, key: "q",  max: 100, min: 0, step:1, onChange: () => {this.draw();}});
	}

	draw() {

    if(this.system1) {
      this.rotateGroup.remove( this.system1 );
		}

    let geometry = new THREE.TorusKnotGeometry (
      this.data.radius, //radius
			this.data.tube, //tube 管子半径
			this.data.radialSegments, //radialSegments 
			this.data.tubularSegments, //tubularSegments
			this.data.p, //p
      this.data.q, //q
		);

    // let geometry = new THREE.CubeGeometry(
    //   500, //width
		// 	500, //height
		// 	500, //depth
		// 	3, //widthSegments
		// 	3, //heightSegments
		// 	3, //depthSegments
		// );

    // let geometry = new THREE.SphereGeometry(
    //   500, //球体半径
    //   24, // 球体横截面上的面个数，最小3，默认8
    //   50, // 球体纵截面上的上半部份面个数，最小2，默认6
    //   //0,
    //   //Math.PI * 2,
    //   //0,
    //   //Math.PI * 2,
    // );

    let material = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 50,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: this.createTexture(),
    });
    material.alphaTest = 0.9;

    this.system1 = new THREE.Points(geometry, material);
    this.system1.sortParticles = true;

    this.rotateGroup.add(this.system1);
	}

  createTexture() {
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
    gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
    gradient.addColorStop(1, 'rgba(0,0,64,0)');
    context.fillStyle = gradient;
    context.fillRect(0,0,canvas.width, canvas.height);

    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
}