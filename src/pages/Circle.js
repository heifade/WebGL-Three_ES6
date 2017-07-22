import * as THREE from 'three';
import Base from './Base';
import $ from "jquery";

// 二维圆
export default class Circle extends Base {
	constructor(container, $control){
    super(container, $control, {});
    
    this.data = {
      radius: 500,
      segments: 30,
      thetaStart: 0,
      thetaLength: 360,
    }


    this.draw();

    this.addControlRange({ title: '半径', hashData: this.data, key: "radius",  max: 1000, min: 10, step:1, onChange: () => {this.draw();}});
    this.addControlRange({ title: '分段', hashData: this.data, key: "segments",  max: 100, min: 3, step:1, onChange: () => {this.draw();}});
    this.addControlRange({ title: '开始角度', hashData: this.data, key: "thetaStart",  max: 360, min: 0, step:1, onChange: () => {this.draw();}});
    this.addControlRange({ title: '扇角度', hashData: this.data, key: "thetaLength",  max: 360, min: 0, step:1, onChange: () => {this.draw();}});
	}
	
  draw() {

    if(this.mesh1) {
      this.rotateGroup.remove( this.mesh1 );
    }

    let geometry = new THREE.CircleGeometry (
      this.data.radius,    // radius
      this.data.segments,   // segments(分段)
      this.data.thetaStart / 180 * Math.PI,   // thetaStart(起始角) 
      this.data.thetaLength / 180 * Math.PI,   // thetaLength(角度) 
    );
    let material = new THREE.MeshNormalMaterial( {side: THREE.DoubleSide} );
    material.wireframe = true;
    
    this.mesh1 = new THREE.Mesh( geometry, material );
    this.rotateGroup.add( this.mesh1 );
  }
	
}
