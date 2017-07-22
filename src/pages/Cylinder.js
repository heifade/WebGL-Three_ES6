import * as THREE from "three";
import Base from './Base';
// import pic from '../../pic/pic1.jpg';

// 圆柱
export default class CylinderGroup extends Base {
  constructor(container, $control) {
    super(container, $control, {showFloor: false});

    this.material1 = new THREE.MeshLambertMaterial({color: 0xff0000});//材质，红色
    this.material1.wireframe = true;

    this.data = {
      radiusTop: 200,
      radiusBottom: 200,
      height: 500,
      radiusSegments: 100,
      heightSegments: 10,
      openEnded: true,
      thetaStart: 0,
      thetaLength: 360,
    }

    this.draw();

    this.addControlRange({ title: `顶半径`, hashData: this.data, key: "radiusTop",  max: 1000, min: 1, step:1, onChange: ()=>{ this.draw() }});
    this.addControlRange({ title: `底半径`, hashData: this.data, key: "radiusBottom",  max: 1000, min: 1, step:1, onChange: ()=>{ this.draw() }});
    this.addControlRange({ title: `高`, hashData: this.data, key: "height",  max: 1000, min: 1, step:1, onChange: ()=>{ this.draw() }});
    this.addControlRange({ title: `竖侧面个数`, hashData: this.data, key: "radiusSegments",  max: 100, min: 2, step:1, onChange: ()=>{ this.draw() }});
    this.addControlRange({ title: `横侧面个数`, hashData: this.data, key: "heightSegments",  max: 100, min: 1, step:1, onChange: ()=>{ this.draw() }});
    this.addControlCheck({ title: `显示两头`, hashData: this.data, key: "openEnded", onChange: ()=>{ this.draw() }});
    this.addControlRange({ title: `开始角度`, hashData: this.data, key: "thetaStart",  max: 360, min: 0, step:1, onChange: ()=>{ this.draw() }});
    this.addControlRange({ title: `角度`, hashData: this.data, key: "thetaLength",  max: 360, min: 0, step:1, onChange: ()=>{ this.draw() }});
    this.addControlCheck({ title: `仅线框`, hashData: this.material1, key: 'wireframe', onChange: ()=>{ this.draw() }});
  }

  // 圆柱
  draw() {

    if(this.mesh1) {
      this.rotateGroup.remove( this.mesh1 );
		}

    let geometry = new THREE.CylinderGeometry(
      this.data.radiusTop, // 圆柱顶半径 Radius of the cylinder at the top. Default is 20.
      this.data.radiusBottom, // 圆柱底半径 Radius of the cylinder at the bottom. Default is 20.
      this.data.height, // 圆柱高度 Height of the cylinder. Default is 100.
      this.data.radiusSegments, // 侧面个数 Number of segmented faces around the circumference of the cylinder. Default is 8
      this.data.heightSegments, // Number of rows of faces along the height of the cylinder. Default is 1.
      !this.data.openEnded, //圆柱体的两端是否显示 A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
      this.data.thetaStart / 180 * Math.PI, //Start angle for first segment, default = 0 (three o'clock position).
      this.data.thetaLength / 180 * Math.PI, //The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cylinder.
    );

    
    this.mesh1 = new THREE.Mesh(geometry, this.material1);
    this.mesh1.position.set(0, 0, 0);
    this.mesh1.castShadow = true;
    this.rotateGroup.add(this.mesh1);
  }
}
