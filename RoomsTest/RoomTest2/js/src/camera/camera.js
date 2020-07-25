// import * as THREE from '../../libs/three.module.js';

export class Camera extends THREE.PerspectiveCamera{
  /**
   * コンストラクターです。
   * @constructor
   */
  constructor() {

    super(45, window.innerWidth / window.innerHeight, 1, 1000);

    this.frame =0;

    this.randomInt = this.randomInt.bind(this);

    this.nowCamPos = new THREE.Vector3(20, 30, 60);
    this.position.set(this.nowCamPos.x, this.nowCamPos.y, this.nowCamPos.z);
    this.nowCamLook = new THREE.Vector3(0, 0, 0);
    this.lookAt(this.nowCamLook.x, this.nowCamLook.y, this.nowCamLook.z);
    this.targetCamPos = new THREE.Vector3(
      this.randomInt(-100, 200),
      this.randomInt(-100, 200),
      this.randomInt(-100, 200)
    );
    this.targetCamLook = new THREE.Vector3(
      0,0,0
      // (2*Math.random()-1)*50,
      // (2*Math.random()-1)*50,
      // (2*Math.random()-1)*50
    );



    // // //TWEEN
    // // //ここから
    // this.camPos = {x: 215, y: 180, z: 150};
    // this.position.set(this.camPos.x, this.camPos.y, this.camPos.z);

    // // var rndPos = (2*Math.random()-1)*100;//-100~100
    // // this.camTarget= {x:rndPos, y:rndPos, z:rndPos};
    // let camTarget= {x:50, y:20, z:-100};


    // this.tween = new TWEEN.Tween(this.camPos).to(camTarget, 1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
    // console.log('update');
    //   this.position.x = this.camPos.x;
    //   this.position.y = this.camPos.y;
    //   this.position.z = this.camPos.z;
    // }).delay(1500).start();//tween.start();も省略されてる
    //ここまで


  }

  /**
   * 毎フレームの更新をかけます。
   */
  update() {

    // TWEEN.update();

    this.frame += 1;

    if(this.frame% 300 == 0){
      this.targetCamPos = new THREE.Vector3(
        this.randomInt(-100, 200),
        this.randomInt(-100, 200),
        this.randomInt(-100, 200)
      );

      this.targetCamLook = new THREE.Vector3(
        0,0,0
        // (2*Math.random()-1)*50,
        // (2*Math.random()-1)*50,
        // (2*Math.random()-1)*50
      );

      // targetCamLook.set(nowBoxPos[lookBoxNUM]);
      //   lookBoxNUM += 1;
      //   if(lookBoxNUM > NUM){lookBoxNUM = 0;}
    }

    // this.camPos += (this.targetCamPos- this.nowCamPos)*0.02;//この書き方動かない！！！！！！！
    this.nowCamPos.x += (this.targetCamPos.x - this.nowCamPos.x) *0.03;
    this.nowCamPos.y += (this.targetCamPos.y - this.nowCamPos.y) *0.03;
    this.nowCamPos.z += (this.targetCamPos.z - this.nowCamPos.z) *0.03;
    // this.position.set(this.nowCamPos);//この書き方動かない！！！！！！！
    this.position.set(this.nowCamPos.x,this.nowCamPos.y,this.nowCamPos.z);

    console.log(new THREE.Vector3(this.targetCamPos.x, this.targetCamPos.y, this.targetCamPos.z));


    this.nowCamLook.x += (this.targetCamLook.x - this.nowCamLook.x) *0.03;
    this.nowCamLook.y += (this.targetCamLook.y - this.nowCamLook.y) *0.03;
    this.nowCamLook.z += (this.targetCamLook.z - this.nowCamLook.z) *0.03;

    this.lookAt(new THREE.Vector3(this.nowCamLook.x, this.nowCamLook.y, this.nowCamLook.z));//これ大事！！！！

    // console.log(new THREE.Vector3(this.targetCamLook.x, this.targetCamLook.y, this.targetCamLook.z));
    // console.log(new THREE.Vector3(this.nowCamLook.x, this.nowCamLook.y, this.nowCamLook.z));
  }


  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
