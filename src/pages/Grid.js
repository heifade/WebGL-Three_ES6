import * as THREE from "three";
import Base from './Base';

// 网格
export default class Grid extends Base {
  constructor(container, $control) {
    super(container, $control, {showGrid: true});
    
  }
}
