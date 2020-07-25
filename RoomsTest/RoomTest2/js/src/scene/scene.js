// import * as THREE from '../../libs/three.module.js';
// import {Camera, RoomCamera, MoveCamera} from '../camera/camera.js';
import {Camera} from '../camera/camera.js';
import Line from '../objects/line.js';

/**
 * シーンクラス：カメラとライト
 */
export class Scene extends THREE.Scene {

    constructor(){

        super();

        // this._frame = 0;//frame

        //カメラ
        this.camera = new Camera();//thisにすること！！！最終的にはgame2.jsでsceneにaddする

        // //TWEEN
        // //ここから
        // this.camPos = {x: 215, y: 180, z: 150};
        // this.camera.position.set(this.camPos.x,this.camPos.y,this.camPos.z);

        // // var rndPos = (2*Math.random()-1)*100;//-100~100
        // // this.camTarget= {x:rndPos, y:rndPos, z:rndPos};
        // this.camTarget= {x:50, y:20, z:-100};


        // this.tween = new TWEEN.Tween(this.camPos).to(this.camTarget, 1000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function(){
        // console.log('update');
        // this.camera.position.x = this.camPos.x;
        // this.camera.position.y = this.camPos.y;
        // this.camera.position.z = this.camPos.z;
        // }).delay(1500).start();//tween.start();も省略されてる
        // //ここまで


        //BOX
        const NUM = 4;
        // this.boxList = [];
        this.boxGroup = new THREE.Group();

        for(let i = 0; i < NUM; i++){
            this.box = new THREE.Mesh(
                new THREE.PlaneGeometry(60, 60),
                new THREE.MeshBasicMaterial({
                    color: new THREE.Color(),
                })
            );
            this.box.position.set(12*i,0,0);
            // this.boxList.push(this.box);
            this.boxGroup.add(this.box);
        }

        this.add(this.boxGroup);

    }

    update(){
        // TWEEN.update();

        this.camera.update();
    }

}

