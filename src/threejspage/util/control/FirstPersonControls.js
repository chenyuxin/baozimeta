import * as THREE from 'three'
import keyListener,{ KeyCodes } from '../../../util/keycontrol/KeyListener'


const distance = 0.03 //动画移动的比例因素 0.03
const rotation = distance/3 //动画旋转的比例因素 0.03
let cameraDirection = new THREE.Vector3() //相机视线方向的向量
const rightVector = new THREE.Vector3(1, 0, 0);//视线方向的垂直right向量
const upVector = new THREE.Vector3(0, 1, 0);//视线方向的垂直up向量

/**
 * 第一人称视角控制器
 */
const initFirstPersonControls = option => {
    const {camera,intervalActions} = option

    intervalActions.push(()=>{//写进入定时循环事件，定义定时循环

        if(keyListener.isKeyDown.size>0) {
            //第一人称视角控制器
            const matrixWorld = camera.matrixWorld.elements //获取世界系矩阵
            
            if (!keyListener.isPushing([KeyCodes.W,KeyCodes.S])) {
                if (keyListener.isPushing(KeyCodes.W)) {
                    camera.updateWorldMatrix(true,false)
                    cameraDirection.set(matrixWorld[8],matrixWorld[9],matrixWorld[10]).normalize() //视线后向量
                    camera.position.sub(cameraDirection.multiplyScalar(distance)) //前进
                } else if (keyListener.isPushing(KeyCodes.S)) {
                    camera.updateWorldMatrix(true,false)
                    cameraDirection.set(matrixWorld[8],matrixWorld[9],matrixWorld[10]).normalize() //视线前向量
                    camera.position.add(cameraDirection.multiplyScalar(distance)) //反过来后退
                }
            }
            
            if (!keyListener.isPushing([KeyCodes.Q,KeyCodes.E])) {
                if (keyListener.isPushing(KeyCodes.Q)) {//平移
                    camera.updateWorldMatrix(true,false)
                    rightVector.set(matrixWorld[0],matrixWorld[1],matrixWorld[2]).normalize()
                    camera.position.sub(rightVector.multiplyScalar(distance)) //反过来向左
                } else if (keyListener.isPushing(KeyCodes.E)) {
                    camera.updateWorldMatrix(true,false)
                    rightVector.set(matrixWorld[0],matrixWorld[1],matrixWorld[2]).normalize()
                    camera.position.add(rightVector.multiplyScalar(distance)) //反过来向左
                }
            }

            if (!keyListener.isPushing([KeyCodes.A,KeyCodes.D])) {
                if (keyListener.isPushing(KeyCodes.A)) {
                    camera.updateWorldMatrix(true,false)
                    upVector.set(matrixWorld[4],matrixWorld[5],matrixWorld[6]).normalize() //视线方向的垂直up向量
                    camera.rotateOnWorldAxis(upVector,rotation) //左转
                } else if (keyListener.isPushing(KeyCodes.D)) {
                    camera.updateWorldMatrix(true,false)
                    upVector.set(matrixWorld[4],matrixWorld[5],matrixWorld[6]).normalize() //视线方向的垂直up向量
                    camera.rotateOnWorldAxis(upVector,0-rotation) //右转
                }
            }
        
            // if (keyListener.isKeyDown.has('KeyR')) {
            //     camera.updateWorldMatrix(true,false)
            //     rightVector.set(matrixWorld[0],matrixWorld[1],matrixWorld[2]).normalize()
            //     camera.rotateOnWorldAxis(rightVector,distance)
            // } else if (keyListener.isKeyDown.has('KeyF')) {
            //     camera.updateWorldMatrix(true,false)
            //     rightVector.set(matrixWorld[0],matrixWorld[1],matrixWorld[2]).normalize()
            //     camera.rotateOnWorldAxis(rightVector,0-distance)
            // }


            // this.gamepad = navigator.getGamepads()[0] //外设控制器
            // console.log(navigator.getGamepads())

        }

    })
    
}

const removeFirstPersonControls = () => {
    // intervalActions.
}

export default initFirstPersonControls

export { removeFirstPersonControls }