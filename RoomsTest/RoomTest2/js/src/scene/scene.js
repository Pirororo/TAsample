// import * as THREE from '../../libs/three.module.js';
import {Camera} from '../camera/camera.js';

/**
 * シーンクラス：カメラとbox
 */
export class Scene extends THREE.Scene {

    constructor(){

        super();

        this.frame = 0;
        this.scene = 0;

        //カメラ
        this.camera = new Camera();//thisにすること！！！最終的にはgame2.jsでsceneにaddする

        //BOX
        this.NUM = 4;
        this.boxList = [];
        this.nowBoxPos = [];
        this.targetBoxPos = [];
        this.boxGroup = new THREE.Group();

        for (let i = 0; i < this.NUM; i++) {
        
            this.floorsize = 60;
            this.geometry = new THREE.PlaneBufferGeometry(this.floorsize, this.floorsize,3,3);

            this.hue = Math.random()*200/360;
            this.boxColor = new THREE.Color();
            this.boxColor.setHSL(this.hue, 0.8, 0.6);
            const material = new THREE.MeshBasicMaterial({
                color: this.boxColor,
                wireframe: true
            });

            this.box = new THREE.Mesh(this.geometry, material);
            this.box.position.set(33*i, 0, 0);
            this.box.rotation.x = 90 * Math.PI / 180;
            this.boxGroup.add(this.box);

            // 個々のmeshをリスト化して保存
            this.boxList.push(this.box);

            // 現在のpositions
            this.nowBoxPos.push(this.box.position.x, this.box.position.y, this.box.position.z);

            // ターゲット位置のpositions
            this.targetBoxPos.push(0, 0, 0);
        }

        this.add(this.boxGroup);

    }

    update(){


        //カメラ
        this.camera.update();

        //box
        for(let i =0; i< this.NUM*3; i++){
            this.nowBoxPos[i] += (this.targetBoxPos[i]-this.nowBoxPos[i]) *0.04;
        }

        this.frame += 1;

        if(this.frame%120 == 0){

            this.scene += 1;
            if(this.scene >= 4){
                this.scene = 1;
            }

            if(this.scene == 1){
                for(let i =0; i< this.NUM; i++){
                    // this.targetBoxPos[i].set((i-3)*33, (i-3)*33, (i-3)*33);
                    this.targetBoxPos[3 * i + 0] = (i-3)*33;
                    this.targetBoxPos[3 * i + 1] = (i-3)*33;
                    this.targetBoxPos[3 * i + 2] = (i-3)*33;
                }
            }
            if(this.scene == 2){
                for(let i =0; i< this.NUM; i++){
                    // this.targetBoxPos[i].set(0, i*33, 0);
                    this.targetBoxPos[3 * i + 0] = 0;
                    this.targetBoxPos[3 * i + 1] = i*33;
                    this.targetBoxPos[3 * i + 2] = 0;
                }
            }
            if(this.scene == 3){
                for(let i =0; i< this.NUM; i++){
                    if(i%2 ==0){
                        // this.targetBoxPos[i].set(i*33, 0, 0);
                        this.targetBoxPos[3 * i + 0] = i*33;
                        this.targetBoxPos[3 * i + 1] = 0;
                        this.targetBoxPos[3 * i + 2] = 0;
                    }else{
                        // this.targetBoxPos[i].set((i-1)*33, 0, 2*33);
                        this.targetBoxPos[3 * i + 0] = (i-1)*33;
                        this.targetBoxPos[3 * i + 1] = 0;
                        this.targetBoxPos[3 * i + 2] = 2*33;
                    }
                }
            }
        }

    }

    draw(){

        //box
        for(let i =0; i< this.NUM; i++){
            this.boxList[i].position.x = this.nowBoxPos[3 * i + 0];
            this.boxList[i].position.y = this.nowBoxPos[3 * i + 1];
            this.boxList[i].position.z = this.nowBoxPos[3 * i + 2];
        }

    }

}

