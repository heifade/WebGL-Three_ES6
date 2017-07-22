import * as THREE from "three";
import $ from "jquery";
import Base from './Base';

// 球体
export default class SphereEarth extends Base {
  constructor(container, $control) {
    super(container, $control, {
      backgroundColor: '#000000',
    });

    this.drawSphere({radius: 500, widthSegments: 50, heightSegments: 50, color: 0xff00ff, picURL: '../../pic/earth.jpg', name:'earth'});
    this.drawSphere({radius: 30, widthSegments: 32, heightSegments: 32, color: 0xff00ff, x: 379, y: 0, z: -379});
    this.drawSphere({radius: 100, widthSegments: 32, heightSegments: 32, color: 0xff0000, picURL: '../../pic/moon.jpg', x: -1000});
    this.drawSphere({radius: 80, widthSegments: 32, heightSegments: 32, color: 0xffff00, picURL: '../../pic/mars.jpg', x: -600, z: 500});
    this.drawSphere({radius: 120, widthSegments: 3, heightSegments: 2, color: 0x00ffff, x: -600, z: -500});
    this.drawSphere({radius: 140, widthSegments: 4, heightSegments: 3, color: 0x0000ff, x: 800, z: 100});
    this.drawSphere({radius: 140, widthSegments: 50, heightSegments: 2, color: 0xff0022, x: 800, z: 500});
    this.drawSphere({radius: 140, widthSegments: 3, heightSegments: 50, color: 0xff0022, x: 100, z: 800});

    let button = $('<input type="button" value="停止自转" />');
    this.autorotationing = true;
    button.click(() => {
      this.autorotationing = !this.autorotationing;
      if (this.autorotationing) {
        button.val("停止自转");
      } else {
        button.val("继续自转");
      }
    });
    $(container).append(button);
  }

  // 球体
  drawSphere({radius = 500, widthSegments = 8, heightSegments = 6, color = 0x000000, picURL = '', x = 0, y = 0, z = 0, name = 'unknow' }) {
    var I = this;
    let geometry = new THREE.SphereGeometry(
      radius, //球体半径
      widthSegments, // 球体横截面上的面个数，最小3，默认8
      heightSegments, // 球体纵截面上的上半部份面个数，最小2，默认6
      //0,
      //Math.PI * 2,
      //0,
      //Math.PI * 2,
    );

    if(picURL) {
      new THREE.TextureLoader().load(
        picURL,
        function ( texture ) {
          var material = new THREE.MeshLambertMaterial( {
            map: texture
          });

          let mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(x, y, z);
          mesh.name = name;
          I.rotateGroup.add(mesh);
        },
        function ( xhr ) {
          console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        function ( xhr ) {
          console.log( 'An error happened' );
        }
      );
    } else {
      let material = new THREE.MeshLambertMaterial({color: color});//材质
      let mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      this.rotateGroup.add(mesh);
    }
  }

  onAnimate() {
    if(this.autorotationing){
      // 遍历子元素，让每个子元素自转
      this.rotateGroup.traverse(e => {
        if(e instanceof THREE.Mesh){
          e.rotation.y += 0.01;
        }
      });
    }
  }
}
