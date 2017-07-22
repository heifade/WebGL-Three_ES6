import * as THREE from "three";
import $ from "jquery";
import Base from './Base';

// 球体
export default class Sphere extends Base {
  constructor(container, $control) {
    super(container, $control, {});

    this.data = {
      radius: 500, // sphere radius. Default is 50.
      widthSegments: 50, // — number of horizontal segments. Minimum value is 3, and the default is 8.
      heightSegments: 50, // — number of vertical segments. Minimum value is 2, and the default is 6.
      phiStart: 0, // — specify horizontal starting angle. Default is 0.
      phiLength: 360,// — specify horizontal sweep angle size. Default is Math.PI * 2.
      thetaStart: 0, // — specify vertical starting angle. Default is 0.
      thetaLength: 180, // — specify vertical sweep angle size. Default is Math.PI.
      wireframe: true, //显示线框
    }

    this.material1 = new THREE.MeshLambertMaterial({color: '#ff0000'});//材质
    this.material1.wireframe = this.data.wireframe;

    this.drawSphere();

    this.ctrlBar.addControlRange({ title: '半径', hashData: this.data, key: "radius",  max: 1000, min: 0, step:1, onChange: () => {this.drawSphere();}});
    this.ctrlBar.addControlRange({ title: 'widthSegments', hashData: this.data, key: "widthSegments",  max: 200, min: 3, step:1, onChange: () => {this.drawSphere();}});
    this.ctrlBar.addControlRange({ title: 'heightSegments', hashData: this.data, key: "heightSegments",  max: 200, min: 2, step:1, onChange: () => {this.drawSphere();}});
    this.ctrlBar.addControlRange({ title: 'phiStart', hashData: this.data, key: "phiStart",  max: 360, min: 0, step:1, onChange: () => {this.drawSphere();}});
    this.ctrlBar.addControlRange({ title: 'phiLength', hashData: this.data, key: "phiLength",  max: 360, min: 0, step:1, onChange: () => {this.drawSphere();}});
    this.ctrlBar.addControlRange({ title: 'thetaStart', hashData: this.data, key: "thetaStart",  max: 180, min: 0, step:1, onChange: () => {this.drawSphere();}});
    this.ctrlBar.addControlRange({ title: 'thetaLength', hashData: this.data, key: "thetaLength",  max: 180, min: 0, step:1, onChange: () => {this.drawSphere();}});

    this.ctrlBar.addControlCheck({ title: `仅线框`, hashData: this.material1, key: 'wireframe'});
  }

  // 球体
  drawSphere() {
    if(this.mesh1){
      this.rotateGroup.remove(this.mesh1);
    }

    var I = this;
    let geometry = new THREE.SphereGeometry(
      this.data.radius, //球体半径
      this.data.widthSegments, // 球体横截面上的面个数，最小3，默认8
      this.data.heightSegments, // 球体纵截面上的上半部份面个数，最小2，默认6
      this.data.phiStart / 180 * Math.PI,
      this.data.phiLength / 180 * Math.PI,
      this.data.thetaStart / 180 * Math.PI,
      this.data.thetaLength / 180 * Math.PI,
    );

    
    //material.wireframe = true;

    this.mesh1 = new THREE.Mesh(geometry, this.material1);
    

    this.mesh1.position.set(0, 0, 0);
    this.rotateGroup.add(this.mesh1);
  }

  onAnimate() {
    
  }
}
