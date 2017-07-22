import * as THREE from "three";
import Base from './Base';
// import pic from '../../pic/pic1.jpg';

// 圆柱
export default class CylinderGroup extends Base {
  constructor(container, $control) {
    super(container, $control, {showFloor: true});

    this.material1 = new THREE.MeshLambertMaterial({color: 0xff0000});//材质，红色
    this.material1.wireframe = true;
    
    this.drawSphere({radiusTop: 200, radiusBottom: 200, height: 500, radiusSegments: 100, heightSegments: 10, x: -500, y: 250, z: 0});
    this.drawSphere({radiusTop: 1, radiusBottom: 200, height: 500, radiusSegments: 100, heightSegments: 10, x: 0, y: 250, z: -500});
    this.drawSphere({radiusTop: 200, radiusBottom: 0, height: 500, radiusSegments: 100, heightSegments: 10, x: 0, y: 250, z: 500});
    this.drawSphere({radiusTop: 100, radiusBottom: 200, height: 500, radiusSegments: 100, heightSegments: 10, x: 500, y: 250, z: 0});

    this.drawSphere({radiusTop: 100, radiusBottom: 200, height: 800, radiusSegments: 100, heightSegments: 10, x: 0, y: 400, z: 0});
    this.drawSphere({radiusTop: 200, radiusBottom: 100, height: 800, radiusSegments: 100, heightSegments: 10, x: 0, y: 250, z: 0});

    this.addControlCheck({ title: `仅线框`, hashData: this.material1, key: 'wireframe'});
  }

  // 圆柱
  drawSphere({radiusTop = 20, radiusBottom = 20, height = 100, radiusSegments = 8, heightSegments = 1, x = 0, y = 0, z = 0 }) {
    let geometry = new THREE.CylinderGeometry(
      radiusTop, // 圆柱顶半径
      radiusBottom, // 圆柱底半径
      height, // 圆柱高度
      radiusSegments, // 侧面个数
      heightSegments, //
      false, 
      0,
      Math.PI * 2,
    );
    
    let sphere = new THREE.Mesh(geometry, this.material1);
    sphere.position.set(x, y, z);
    sphere.castShadow = true;
    this.rotateGroup.add(sphere);
  }
}
