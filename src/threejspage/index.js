import React, { Fragment } from 'react'
import * as THREE from 'three'
import KeyListener from '../util/KeyListener'

/**
 * 创建threejs画布占满浏览器Body
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )
//const canvasDom = React.createElement("canvas", renderer.domElement);



const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
camera.position.z = 15

const geometry = new THREE.BoxGeometry( 3, 3, 3 )
const material = new THREE.MeshBasicMaterial( { color: 0x19CAAD } )
const cube = new THREE.Mesh( geometry, material )
scene.add( cube )

const geometry2 = new THREE.BoxGeometry( 1, 1, 1 )
const material2 = new THREE.MeshBasicMaterial( { color: 0xF4606C } )
const cube2 = new THREE.Mesh( geometry2, material2 )
cube2.position.x= -4
cube2.position.y= 3
cube2.position.z= 0
scene.add( cube2 )





const keyListener = new KeyListener()


/**
 * RAF事件循环，根据帧数来渲染
 */
const animate = () => {
	requestAnimationFrame( animate )
    
	
    renderer.render( scene, camera )
}
animate()

/**
 * 定时循环
 */
setInterval(() => {
    // this.gamepad = navigator.getGamepads()[0]
    // console.log(navigator.getGamepads())
    cube.rotation.x += 0.0001
    cube.rotation.y += 0.001
    if(keyListener.isKeyDown.size>0) {
        if (keyListener.isKeyDown.has('KeyW')) {
            camera.position.z -= 0.01
        } else if (keyListener.isKeyDown.has('KeyS')) {
            camera.position.z += 0.01
        } //else if ()
    }

}, 1)


/**
 * Threejs画布
 * @returns 
 */
const SceneWindow = (props) => {

    // const keyControl = useState()

    // useEffect(()=>{
    //     // renderer.domElement
    //     if (KeyControl.isMouseDown) {
    //         cube.rotation.x += KeyControl.mouseX;
    //         cube.rotation.y += KeyControl.mouseY;
    //         console.log(KeyControl.x)
    //     }
    //     renderer.render(scene,camera)
    // },[])

    
    // return <canvas ref={canvasRef} width={props.width} height={props.height} >{renderer.domElement}</canvas>
    return <Fragment></Fragment>
}

export default SceneWindow