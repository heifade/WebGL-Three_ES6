import * as THREE from "three";
import Stats from '../../libs/stats';
import $ from "jquery";

export default class Base {
  constructor($container, $control, {width = 1000, height = 700, showFloor = false, showGrid = false, backgroundColor = '#000000' }) {
    //super();

    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;

    this.$container = $container;
    this.$control = $control;

    this.controlValue = {
      rotateSpeed: 2,
      fog: 0,
      pointLight: {
        x: 1000,
        y: 1000,
        z: 1000,
        color: '#ffffff',
        showLight: false,
        moveLight: false,
      },
      showShadow: true,
    }

    this.initRenderer();
    this.initCamera();
    this.initScene();
    this.initRotateGroup();
    if(showFloor){
      this.initFloor();
    }
    if(showGrid) {
      this.initGrid();
    }
    this.initLight();

    this.initControl();
  }
  // 渲染
  render() {
    //this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }
  // WebGL渲染器
  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true }); //抗据齿
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(this.backgroundColor, 1.0);
    if(this.controlValue.showShadow) {
      this.renderer.shadowMap.type = THREE.PCFShadowMap;
      this.renderer.shadowMap.enabled = true;
    }

    // 渲染器放入容器
    this.$container.append(this.renderer.domElement);
  }
  // 初始化摄像机
  initCamera() {
    // 透视
    this.camera = new THREE.PerspectiveCamera(
      30, //视角(度)
      this.width / this.height, //纵横比,即平面长高比
      1, //物体近平面离摄像头的距离
      5000 //物体远平面离摄像头的距离
    );

    // // 正投影
    // this.camera = new THREE.OrthographicCamera(
    //   -this.width, this.width,
    //   this.height, -this.height,
    //   1, //物体近平面离摄像头的距离
    //   5000 //物体远平面离摄像头的距离
    // );


    // 摄像头位置
    this.camera.position.x = 0;
    this.camera.position.y = 2000;
    this.camera.position.z = 3000;
    // 摄像头上方向
    this.camera.up.x = 0;
    this.camera.up.y = 1;
    this.camera.up.z = 0;
    // 摄像头观察点
    this.camera.lookAt({ x: 0, y: 0, z: 0 });

    // document.onkeydown = (ev) => {
    //   switch(ev.keyCode){
    //     case 38: //按上键
    //       this.camera.position.y *= 0.95;
    //       this.camera.position.z *= 0.95;
    //       break;
    //     case 40: //按下键
    //       this.camera.position.y /= 0.95;
    //       this.camera.position.z /= 0.95;
    //       break;
    //     case 37: //按左键
    //       this.camera.rotation.z -= 10 / 180 * Math.PI;
    //       break;
    //     case 39: //按右键
    //       this.camera.rotation.z += 10 / 180 * Math.PI;
    //       break;
    //     default:
    //       return;
    //   }
    // }
  }
  // 设置场景
  initScene() {
    this.scene = new THREE.Scene();
    // let axes = new THREE.AxisHelper(1000);
    // this.scene.add(axes);
  }
  // 设置网格
  initGrid () {
    let size = this.width, step = 100;
    let geometry = new THREE.Geometry();
    let material = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors
    });
    let color1 = new THREE.Color(0x444444);
    let color2 = new THREE.Color(0x888888);
    for (let i = -size; i <= size; i += step) {
      geometry.vertices.push(
        new THREE.Vector3(-size, 0, i),
        new THREE.Vector3(size, 0, i),
        new THREE.Vector3(i, 0, -size),
        new THREE.Vector3(i, 0, size)
      );

      let color = i === 0 ? color1 : color2; //i为0时，为x轴或y轴
      geometry.colors.push(color, color, color, color);
    }
    
    let grid = new THREE.LineSegments(geometry, material);
    this.rotateGroup.add(grid);
  }
  // 地板
  initFloor() {
    let geometry = new THREE.PlaneGeometry(this.width * 4, this.height * 4, 1, 1);
    let material = new THREE.MeshLambertMaterial({color: 0xffffff});
    // material.opacity = 0.5;
    // material.transparent = true;
    this.floorMesh = new THREE.Mesh(geometry, material);
    this.floorMesh.name = '地板';
    this.floorMesh.rotation.x = -90 / 180 * Math.PI;
    this.floorMesh.receiveShadow = true;
    this.rotateGroup.add(this.floorMesh);
  }
  // 创建一个旋转的分组
  initRotateGroup() {
    this.rotateGroup = new THREE.Object3D();
    this.scene.add(this.rotateGroup);

    // 鼠标可以拖动
    let drag = false;
    let old_x, old_y;
    let dX = 0, dY = 0;

    let mouseDown = function(e) {
        drag = true;
        old_x = e.pageX, old_y = e.pageY;
        e.preventDefault();
        return false;
    };

    let mouseUp = function(e) {
        drag = false;
    };

    let mouseMove = (e) => {
        if (!drag) return false;
        dX = (e.pageX - old_x) * 2 * Math.PI / this.width;
        dY = (e.pageY - old_y) * 2 * Math.PI / this.height;
        // THETA += dX;
        // PHI += dY;

        this.rotateGroup.rotation.y += dX;
        this.rotateGroup.rotation.x += dY;

        old_x = e.pageX, old_y = e.pageY;
        e.preventDefault();
    };

    this.renderer.domElement.addEventListener("mousedown", mouseDown, false);
    this.renderer.domElement.addEventListener("mouseup", mouseUp, false);
    this.renderer.domElement.addEventListener("mouseout", mouseUp, false);
    this.renderer.domElement.addEventListener("mousemove", mouseMove, false);
  }
  // 设置光源
  initLight() {
 
    this.lightGroup = new THREE.Object3D();
    this.scene.add(this.lightGroup);

    let {x, y, z} = this.controlValue.pointLight;

    //点光源
    this.pointLight = new THREE.PointLight("#ccffcc", 1, 8000);
    this.pointLight.position.set( x, y, z );
    this.lightGroup.add(this.pointLight);

    //环境光
    this.mmbientLight = new THREE.AmbientLight('#333333');
    this.lightGroup.add(this.mmbientLight);

    //聚光灯光源
    this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set( x, y, z );
    this.spotLight.castShadow = this.controlValue.showShadow;
    this.spotLight.shadow.camera.near = 10;
    this.spotLight.shadow.camera.far = 5000;
    this.spotLight.shadow.camera.fov = 30;
    this.spotLight.distance = 0;
    this.lightGroup.add(this.spotLight);

    // this.spotLight.angle = 0.4;
    this.spotLightShadowCamera = new THREE.CameraHelper(this.spotLight.shadow.camera);
    this.spotLightShadowCamera.visible = this.controlValue.showLight;
    this.scene.add(this.spotLightShadowCamera); //显示光源物体
  }

  addFog(fog) {
    // this.scene.fog = new THREE.Fog(
    //   0xffffff,  //雾颜色
    //   1000, //近处
    //   5000, //远处
    // );
    this.scene.fog = new THREE.FogExp2(0xFFFFFF, fog); //0.00022
  }

  // 动画
  animate() {
    let I = this;
    let currentTime = Date.now();
    let duration = 5000;

    function run() {

      if(I.onAnimate) { // 调用子类动画
        I.onAnimate();
      }
      
      if (I.controlValue.rotateSpeed) {
        var now = Date.now();
        var deltat = now - currentTime;
        currentTime = now;
        var fract = deltat / duration * I.controlValue.rotateSpeed;
        var angle = Math.PI * 2 * fract / 3;
        I.rotateGroup.rotation.y += angle; //绕z轴转
        //I.scene.rotation.z += angle;//绕z轴转
        
      } else {
        currentTime = Date.now();
      }

      if(I.controlValue.pointLight.moveLight) {
        I.lightGroup.rotation.y += 0.05;
      }

      I.render();

      requestAnimationFrame(run);
    }

    run();
  }

  initControl() {
    let {controlValue} = this;
    let {pointLight} = controlValue; 
    let {x, y, z, showLight, moveLight, color} = pointLight;
    
    let $divControls = $(`
      <table>
        <thead>
          <tr><td colspan="3"><div id="divStatus"></div></td></tr>
        </thead>
        <tbody name="tbody">

        </tbody>
      </table>`);

    this.$controlTbody = $divControls.find('[name="tbody"]');

    this.$divStatus = $divControls.find('#divStatus');

    this.$control.empty()
    this.$control.append($divControls);

    this.initStats();

    this.addControlRange({ title: `场景转速`, hashData: controlValue, key: "rotateSpeed",  max: 10, min: 0, step:1, onChange: () => {}});
    this.addControlRange({ title: `场景雾化`, hashData: controlValue, key: "fog",  max: 10, min: 0, step:1, onChange: (value) => {this.addFog(value / 10000);}});
    this.addControlCheck({ title: `光源线`, hashData: controlValue.pointLight, key: 'showLight', onChange: (value) => { this.spotLightShadowCamera.visible = value; }});
    this.addControlCheck({ title: `光源动`, hashData: controlValue.pointLight, key: 'moveLight'});
    this.addControlColor({ title: '光色', hashData: controlValue.pointLight, key: 'color', onChange: (value) => {this.spotLight.color = new THREE.Color(value);} });
    this.addControlRange({ title: `光源x`, hashData: controlValue.pointLight, key: "x",  max: 5000, min: -5000, step:100, onChange: (value) => {
      let {x, y, z} = controlValue.pointLight;
      this.pointLight.position.set( x, y, z );
      this.spotLight.position.set( x, y, z );
    }});
    this.addControlRange({ title: `光源y`, hashData: controlValue.pointLight, key: "y",  max: 5000, min: -5000, step:100, onChange: (value) => {
      let {x, y, z} = controlValue.pointLight;
      this.pointLight.position.set( x, y, z );
      this.spotLight.position.set( x, y, z );
    }});
    this.addControlRange({ title: `光源z`, hashData: controlValue.pointLight, key: "z",  max: 5000, min: -5000, step:100, onChange: (value) => {
      let {x, y, z} = controlValue.pointLight;
      this.pointLight.position.set( x, y, z );
      this.spotLight.position.set( x, y, z );
    }});

    this.addControlRange({ title: `摄像机x`, hashData: this.camera.position, key: "x",  max: 5000, min: -5000, step:100, onChange: () => {}});
    this.addControlRange({ title: `摄像机y`, hashData: this.camera.position, key: "y",  max: 5000, min: -5000, step:100, onChange: () => {}});
    this.addControlRange({ title: `摄像机z`, hashData: this.camera.position, key: "z",  max: 5000, min: -5000, step:100, onChange: () => {}});
  
    this.addControlCheck({ title: `显示阴影`, hashData: controlValue, key: 'showShadow', onChange: (value) => {
      this.renderer.shadowMap.type = value ? THREE.PCFShadowMap : null;
      this.renderer.shadowMap.enabled = value;
      this.spotLight.castShadow = value;
    }});
  }
  addControl($tr) {
    this.$controlTbody.append($tr);
  }
  addControlRange({title, hashData, key, max, min, step, onChange}) {
    let $tr = $(`<tr>
      <td>${title}</td>
      <td><input type="range" name="txt" value=${hashData[key]} max=${max} min=${min} step=${step}/></td>
      <td><span name="lbl"></span></td>
    </tr>`);
    $tr.find('[name="lbl"]').html(hashData[key]);
    $tr.find('[name="txt"]').change((e) => {
      hashData[key] = Number(e.target.value);
      $tr.find('[name="lbl"]').html(e.target.value);
      if(onChange) {
        onChange(e.target.value);
      }
    });
    this.addControl($tr);
  }
  addControlButton({title, onClick}) {
    let $tr = $(`
      <tr><td></td><td><input type="button" value=${title} name="btn" /></td><td></td></tr>
    `);

    $tr.find('[name="btn"]').click(()=>{
      if(onClick){
        onClick();
      }
    });
    this.addControl($tr);
  }
  addControlCheck({title, hashData, key, onChange}) {
    let $tr = $(`
      <tr><td>${title}</td><td><input type="checkbox" name="checkbox" /></td><td></td></tr>
    `);

    if(hashData[key]) {
      $tr.find('[name="checkbox"]').attr('checked', 'true');
    }

    $tr.find('[name="checkbox"]').click((e)=>{
      hashData[key] = e.target.checked;
      if(onChange){
        onChange(e.target.checked);
      }
    });
    this.addControl($tr);
  }
  addControlColor({title, hashData, key, onChange}) {
    let $tr = $(`
      <tr><td>${title}</td><td><input type="color" name="txtColor" /></td><td></td></tr>
    `);
    $tr.find('[name="txtColor"]').val(hashData[key]);
    $tr.find('[name="txtColor"]').change((e)=>{
      hashData[key] = e.target.value;
      if(onChange){
        onChange(e.target.value);
      }
    });
    this.addControl($tr);
  }

  initStats() {
    this.stats = new Stats();
    this.stats.setMode(0); // 0: fps, 1: ms
    this.$divStatus.append(this.stats.domElement);
  }


}