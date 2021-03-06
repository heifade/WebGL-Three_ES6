import $ from 'jquery';
import Line from '../src/pages/Line';
import PCubeByVertices from '../src/pages/PCubeByVertices';
import PCubeMultiple from '../src/pages/PCubeMultiple';
import PCubeAdd from '../src/pages/PCubeAdd';
import PinMian from '../src/pages/PinMian';
import Grid from '../src/pages/Grid';
import PCubeScale from '../src/pages/PCubeScale';
import SphereEarth from '../src/pages/SphereEarth';
import Sphere from '../src/pages/Sphere';
import Cylinder from '../src/pages/Cylinder';
import CylinderGroup from '../src/pages/CylinderGroup';
import Plane from '../src/pages/Plane';
import TriangularCone from '../src/pages/TriangularCone';
import MagicSquare from '../src/pages/MagicSquare';
import Circle from '../src/pages/Circle';
import Shape from '../src/pages/Shape';
import Torus from '../src/pages/Torus';
import TorusKnot from '../src/pages/TorusKnot';
import Text from '../src/pages/Text';
import Combination from '../src/pages/Combination';
import Particle from '../src/pages/Particle';
import QuarkUIIndex from '../src/pages/QuarkUIIndex';
import Tube from '../src/pages/Tube';
import Tetrahedron from '../src/pages/Tetrahedron';
import Polyhedron from '../src/pages/Polyhedron';
// import Parametric from '../src/pages/Parametric';
import Octahedron from '../src/pages/Octahedron';
import Lathe from '../src/pages/Lathe';
import Icosahedron from '../src/pages/Icosahedron';
import Cube from '../src/pages/Cube';





import '../css/index.less';

class Index {
	constructor() {

		let menuList = [
			{name: '线条', className: Line},
			{name: '二维圆', className: Circle},
			{name: '自定义图形', className: Shape},
			{name: '平面', className: Plane},
			{name: '网格', className: Grid},
			{name: '立方体', className: Cube},
			{name: '立方体(自制)', className: PCubeByVertices},
			{name: '三角锥(自制)', className: TriangularCone},
			{name: '立方体组合', className: PCubeMultiple},
			{name: '立方体，添加删除', className: PCubeAdd},
			{name: '八面体', className: Octahedron},
			{name: '十二面体', className: Icosahedron},
			{name: '圆环', className: Torus},
			{name: '环面纽结', className: TorusKnot},
			{name: '自定义平面', className: PinMian},
			{name: '缩放', className: PCubeScale},
			{name: '球体', className: Sphere},
			{name: '地球', className: SphereEarth},
			{name: '圆柱', className: Cylinder},
			{name: '圆柱,圆锥组合', className: CylinderGroup},
			{name: '魔方', className: MagicSquare},
			{name: '文本', className: Text},
			{name: '粒子', className: Particle},
			{name: '组合', className: Combination},
			{name: '管子', className: Tube},
			{name: '四面体', className: Tetrahedron},
			{name: '多面体', className: Polyhedron},
			// {name: '参数曲面体', className: Parametric},
			
			{name: '车床', className: Lathe},
			

			
			
			{name: 'QuarkUI首页', className: QuarkUIIndex},
		];

		let menuListHTML = menuList.map((menu, index) => {
			return `<li class="liMenuItem">${index + 1 + '、'}${menu.name}</li>`;
		}).join('');

		let $html = $(`
			<table class="frameTable">
				<tr>
					<td class="tdMenu">
						<div class="divMenu">
							<ul>
								${menuListHTML}
							</ul>
						</div>
					</td>
					<td class="tdContainer">
						<div class="divContainer"></div>
					</td>
					<td class="tdControl">
						<div class="divControl"></div>
					</td>
				</tr>
			</table>`);

		$(document.body).append($html);

		const $divContainer = $html.find('.divContainer');
		const $liMenuItems = $html.find('.liMenuItem');
		const $divControl = $html.find('.divControl');

		$liMenuItems.click((li) => {
			const className = menuList[$(li.target).index()].className;

			$liMenuItems.removeClass('active');
			li.target.className = 'active';

			if(this.instance) {
				this.instance.dispose();
			}

			$divContainer.empty();

			this.instance = new className($divContainer, $divControl);
			this.instance.render();
			this.instance.animate();

		});
	}
}

export default new Index();