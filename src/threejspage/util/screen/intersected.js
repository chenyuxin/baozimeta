


import * as THREE from 'three'
import keyListener from '../../../util/keycontrol/KeyListener'

const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
let INTERSECTED,threeMouseX,threeMouseY

/**
 * 通过鼠标移动到屏幕，显示选中的mesh物体objects
 * @param {*} objects 需要验证是否选中的物体
 * @param {*} camera 
 */
const intersect = (objects,camera) => {
    // camera.updateMatrixWorld()
    threeMouseX = (keyListener.mouseX / window.innerWidth) * 2 - 1
    threeMouseY = -(keyListener.mouseY / window.innerHeight) * 2 + 1
    pointer.set(threeMouseX,threeMouseY)
    raycaster.setFromCamera( pointer, camera )
    const intersects = raycaster.intersectObjects( objects, false )
    if ( intersects.length > 0 ) {
        if ( INTERSECTED !== intersects[ 0 ].object ) {
            if ( INTERSECTED ) INTERSECTED.material.emissive?.setHex( INTERSECTED.currentHex )
            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive?.getHex()
            INTERSECTED.material.emissive?.setHex( 0xff0000 )
        }
    } else {
        if ( INTERSECTED ) INTERSECTED.material.emissive?.setHex( INTERSECTED.currentHex )
        INTERSECTED = null
    }
}

/**
 * 通过鼠标移动到屏幕，显示选中的mesh物体objects
 * @param {*} animateActions 
 * @param {*} objects 
 * @param {*} camera 
 */
const initIntersect = (option) => {
    const {animateActions,objects,camera} = option
    animateActions.push(()=>{
        intersect(objects, camera)
    })
}

export default initIntersect