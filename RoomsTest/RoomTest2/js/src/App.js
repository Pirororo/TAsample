// import * as THREE from '../libs/three.module.js';

/**
 * メインアプリクラスです。
 */
export class App{
//  export default class App{
    /**
   * @constructor
   * @param sceneInstance
   */
  constructor(sceneInstance){
    //この中からconstructer外部のmethodを呼び出すためにはbindする必要がある
    this._update = this._update.bind(this);
    this._resize = this._resize.bind(this);
    this._initStats = this._initStats.bind(this);

    //fps表示
    this._stats = this._initStats();

    // シーン
    this._scene = sceneInstance;

    //カメラ
    this.orbitControls = new THREE.OrbitControls(this._scene.camera);
    this.orbitControls.autoRotate = false;
    // this.orbitControls.enableDamping = true;
    // this.orbitControls.dampingFactor = 0.2;
    // this.clock = new THREE.Clock();


    //Tween
    this.camPos = {x: 215, y: 315, z: -105};
    this._scene.camera.position.set(this.camPos.x,this.camPos.y,this.camPos.z);
    // var rndPos = (2*Math.random()-1)*100;//-100~100
    // this.camTarget= {x:rndPos, y:rndPos, z:rndPos};
    this.camTarget= {x:50, y:20, z:-100};

    this.tween = new TWEEN.Tween(this.camPos).to(this.camTarget, 1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
      console.log('update!!!!!!!!!');

      // this._scene.camera.position.x = this.camPos.x;
      // this._scene.camera.position.y = this.camPos.y;
      // this._scene.camera.position.z = this.camPos.z;
    }).delay(1500).start();//tween.start();も省略されてる



    //レンダラー
    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this._renderer.setClearColor(new THREE.Color(0x000000));
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    this._renderer.setPixelRatio(1);

    // DOMを追加
    this._wrapper = document.getElementById('WebGL-output').appendChild(this._renderer.domElement);


    // リサイズ
    this._resize();
    window.addEventListener('resize', this._resize);

    // シェーダー
    //レンダーパス
    var renderPass = new THREE.RenderPass(this._scene, this._scene.camera);
    renderPass.clear = true;//Lineは線が更新されていくのでtrueにする、falseだと線最初から全部のこっちゃう


    //エフェクトパス
    //ブルームパス
    var bloomPass = new THREE.BloomPass(3, 25, 5.0, 256);
    bloomPass.enabled = true;

    //出力パス
    //コピーパス
    var effectCopy = new THREE.ShaderPass(THREE.CopyShader);//コピー
    effectCopy.renderToScreen = true;

    //コンポーザーの定義
    this.composer = new THREE.EffectComposer(this._renderer);
    this.composer.renderTarget1.stencilBuffer = true;//?

    //コンポーザーに入れていく
    this.composer.addPass(renderPass);
    this.composer.addPass(bloomPass);//（出力パスの前にかく）
    this.composer.addPass(effectCopy);


    var controls = new function () {

        //ブルームパス
        this.strength = 0.1;
        this.kernelSize = 5;
        this.sigma = 1.0;
        this.resolution = 256;

        this.updateEffectBloom = function () {
            bloomPass.strength = controls.strength, 
            console.log(bloomPass.strength);
            bloomPass.kernelSize = controls.kernelSize, 
            bloomPass.sigma = controls.sigma,
            bloomPass.resolution = controls.resolution
        };
    };

    var gui = new dat.GUI();
    var bpFolder = gui.addFolder("BloomPass");
    bpFolder.add(controls, "strength", 1, 10).onChange(controls.updateEffectBloom);
    bpFolder.add(controls, "kernelSize", 1, 100).onChange(controls.updateEffectBloom);
    bpFolder.add(controls, "sigma", 1, 10).onChange(controls.updateEffectBloom);
    bpFolder.add(controls, "resolution", 0, 1024).onChange(controls.updateEffectBloom);


    // フレーム毎の更新
    this._update();

    // this.camSwitch = "mainCam";

  }




  /**
  * フレーム毎の更新をします。
  */
  _update() {

    this._stats.update();
    // TWEEN.update();

    // var delta = this.clock.getDelta();
    // this.orbitControls.update(delta);

    this._renderer.autoClear = false;//これ大事〜！trueだと色が毎回背景白にクリアされちゃう

    // シーンの更新
    this._scene.update();

    requestAnimationFrame(this._update);
    this.composer.render();
    // this.composer.render(delta);
  

    // // カメラを切り替え
    // if(this.camSwitch == "mainCam"){
    //   this._renderer.render(this._scene, this._scene.camera);
    // }else if(this.camSwitch == "roomCam"){
    //   this._renderer.render(this._scene, this._scene.roomCamera);
    // }else if(this.camSwitch == "moveCam"){
    //   this._renderer.render(this._scene, this._scene.moveCamera);
    // }

  }

  /**
   * リサイズ
   */
  _resize() {
    const width = this._wrapper.clientWidth;
    const height = this._wrapper.clientHeight;
    this._renderer.domElement.setAttribute('width', String(width));
    this._renderer.domElement.setAttribute('height', String(height));
    this._renderer.setPixelRatio(window.devicePixelRatio || 1.0);
    this._renderer.setSize(width, height);
    this._scene.camera.aspect = width / height;
    this._scene.camera.updateProjectionMatrix();
  }

  _initStats() {

    this._stats = new Stats();
    this._stats.setMode(0); // 0: fps, 1: ms

    this._stats.domElement.style.position = 'absolute';
    this._stats.domElement.style.left = '0px';
    this._stats.domElement.style.top = '0px';

    document.getElementById("Stats-output").appendChild(this._stats.domElement);

    return this._stats;
}

}