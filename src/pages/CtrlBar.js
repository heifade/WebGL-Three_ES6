import Stats from '../../libs/stats';
import $ from "jquery";

export default class CtrlBar {
  constructor($control, base) {
    this.$control = $control;
    this.base = base;
  }


  initControl() {
    let {controlValue} = this.base;
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
      this.base.pointLight.position.set( x, y, z );
      this.base.spotLight.position.set( x, y, z );
    }});
    this.addControlRange({ title: `光源y`, hashData: controlValue.pointLight, key: "y",  max: 5000, min: -5000, step:100, onChange: (value) => {
      let {x, y, z} = controlValue.pointLight;
      this.base.pointLight.position.set( x, y, z );
      this.base.spotLight.position.set( x, y, z );
    }});
    this.addControlRange({ title: `光源z`, hashData: controlValue.pointLight, key: "z",  max: 5000, min: -5000, step:100, onChange: (value) => {
      let {x, y, z} = controlValue.pointLight;
      this.base.pointLight.position.set( x, y, z );
      this.base.spotLight.position.set( x, y, z );
    }});

    this.addControlRange({ title: `摄像机x`, hashData: this.base.camera.position, key: "x",  max: 5000, min: -5000, step:100, onChange: () => {}});
    this.addControlRange({ title: `摄像机y`, hashData: this.base.camera.position, key: "y",  max: 5000, min: -5000, step:100, onChange: () => {}});
    this.addControlRange({ title: `摄像机z`, hashData: this.base.camera.position, key: "z",  max: 5000, min: -5000, step:100, onChange: () => {}});
  
    this.addControlCheck({ title: `显示阴影`, hashData: controlValue, key: 'showShadow', onChange: (value) => {
      this.base.renderer.shadowMap.type = value ? THREE.PCFShadowMap : null;
      this.base.renderer.shadowMap.enabled = value;
      this.base.spotLight.castShadow = value;
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