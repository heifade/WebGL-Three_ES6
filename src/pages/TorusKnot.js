import * as THREE from 'three';
import Base from './Base';
import $ from "jquery";

// 立方体
export default class TorusKnot extends Base {
	constructor(container, $control){
		super(container, $control, {});

		this.data = {
			radius: 500,
			tube: 100, 
      radialSegments: 100,
			tubularSegments: 50,
			p: 2,//几何体绕旋转对称轴旋转多少次
			q: 3,//几何体绕圆环面内部绕一圈的次数
		}
		
		this.material1 = new THREE.MeshLambertMaterial({color: '#ff0000'});//材质
		this.material1.wireframe = true;

		this.draw();

		this.ctrlBar.addControlRange({ title: `圆环半径`, hashData: this.data, key: "radius",  max: 1000, min: 10, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlRange({ title: `管子直径`, hashData: this.data, key: "tube",  max: 1000, min: 10, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlRange({ title: `管子分段`, hashData: this.data, key: "radialSegments",  max: 500, min: 3, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlRange({ title: `圆环分段`, hashData: this.data, key: "tubularSegments",  max: 500, min: 0, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlRange({ title: `圆心旋转`, hashData: this.data, key: "p",  max: 10, min: 0, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlRange({ title: `环面旋转`, hashData: this.data, key: "q",  max: 100, min: 0, step:1, onChange: () => {this.draw();}});
		this.ctrlBar.addControlCheck({ title: `仅线框`, hashData: this.material1, key: 'wireframe'});
	}

	draw() {

		if(this.mesh1) {
      this.rotateGroup.remove( this.mesh1 );
		}

		let geometry = new THREE.TorusKnotGeometry (
      this.data.radius, //radius
			this.data.tube, //tube 管子半径
			this.data.radialSegments, //radialSegments 
			this.data.tubularSegments, //tubularSegments
			this.data.p, //p
      this.data.q, //q
		);
		
		this.mesh1 = new THREE.Mesh(geometry, this.material1);
		this.rotateGroup.add(this.mesh1);
	}
}