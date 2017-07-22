import * as THREE from "three";

export default class PlaneGeometry1 extends THREE.Geometry {
  constructor(width, height, segmentsWidth = 1, segmentsHeight = 1) {
    super(width, height, segmentsWidth, segmentsHeight);

    // 计算需要的顶点来构成面
    let width_half = width / 2;
    let height_half = height / 2;
    let gridX = segmentsWidth;
    let gridZ = segmentsHeight;

    let segment_width = width / segmentsWidth;
    let segment_height = height / segmentsHeight;

    let normal = new THREE.Vector3(0, 0, 1); //法线向量

    for (let iz = 0; iz <= gridZ; iz++) {
      for (let ix = 0; ix <= gridX; ix++) {
        let x = -width_half + ix * segment_width;
        let y = -height_half + iz * segment_height;

        this.vertices.push(new THREE.Vector3(x, -y, 0));
      }
    }

    // 将顶点的顺序传递进去
    for (let iz = 0; iz < gridZ; iz++) {
      for (let ix = 0; ix < gridX; ix++) {
        let a = ix + (gridX + 1) * iz;
        let b = ix + (gridX + 1) * (iz + 1);
        let c = ix + 1 + (gridX + 1) * (iz + 1);
        //let d = ix + 1 + (gridX + 1) * iz;

        let face = new THREE.Face3(a, b, c);
        face.normal.copy(normal);
        face.vertexNormals.push(
          normal.clone(),
          normal.clone(),
          normal.clone(),
          normal.clone()
        );
        this.faces.push(face);
      }
    }
    // 实现平面的纹理坐标

    // 计算这个面的重心
    //this.computeCentroids();
  }
}
