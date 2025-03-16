import React, { Fragment } from 'react'
import * as THREE from 'three'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import initFirstPersonControls from './util/control/FirstPersonControls'
import initStats from './util/monitor/Stats'
import initIntersect from './util/screen/intersected'
import initSky from './background/sky'
import initWater from './plane/water/water'
import HardWood from './plane/floors/wood/hardwood'
import { createComputer, createKeyboard, createTable } from './util/object_op/ObjectOp'
import { gameTypingDxerciseBegin } from './games/TypingDxercise'

/**
 * 创建threejs画布占满浏览器Body
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight )
window.addEventListener( 'resize', () => {
    renderer.setSize( window.innerWidth, window.innerHeight )
})
renderer.shadowMap.enabled = true //开启阴影的渲染

document.body.appendChild( renderer.domElement )
//document.getElementById('root').appendChild( renderer.domElement )
//const canvasDom = React.createElement("canvas", renderer.domElement);

const scene = new THREE.Scene()
//const helper = new THREE.GridHelper( 10000, 2, 0xffffff, 0xffffff ) //网格辅助
//scene.add( helper )

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 450000 )
// camera.position.z = 15
camera.position.set( 0, 2, 18 )
camera.rotation.y -= 0.3

/**
 * 帧数渲染事件，外部传入回调渲染外部定义渲染
 */
const animateActions = []
/**
 * RAF事件循环，根据帧数来渲染
 */
renderer.setAnimationLoop(() => {
	//requestAnimationFrame( animate )
    animateActions.forEach(animateAction => {
        animateAction()
    })
	
    renderer.render( scene, camera )
})

/**
 * 定时循环事件，外部传入回调外部定义定时循环
 */
const intervalActions = []
/**
 * 定时循环
 */
setInterval(() => {
    intervalActions.forEach(intervalAction => {
        intervalAction()
    })

}, 1)




//添加objects
new HardWood({animateActions,scene}) //实木地板

const geometry = new THREE.BoxGeometry( 3, 3, 3 )
const material = new THREE.MeshLambertMaterial( { color: 0x19CAAD } )
const cube = new THREE.Mesh( geometry, material )
cube.position.x= 5
cube.position.y= 4
cube.position.z= 3
cube.castShadow = true
scene.add( cube )
intervalActions.push(()=>{
    cube.rotation.x += 0.002
    cube.rotation.y += 0.001
})

const geometry2 = new THREE.BoxGeometry( 1, 1, 1 )
const material2 = new THREE.MeshLambertMaterial( { color: 0xF4606C } )
const cube2 = new THREE.Mesh( geometry2, material2 )
cube2.position.x= -4
cube2.position.y= 3
cube2.position.z= 0
cube2.castShadow = true
scene.add( cube2 )
const cube2V = new THREE.Vector3(5,3,2)
intervalActions.push(()=>{
    cube2.rotateOnAxis( cube2V, 0.0003)
})


const geometry3 = new THREE.BoxGeometry( 1, 1, 1 )
const material3 = new THREE.MeshLambertMaterial( { color: 0xD1BA74 } )
const cube3 = new THREE.Mesh( geometry3, material3 )
cube3.position.set(-6,-0.4,-20)
cube3.castShadow = true
scene.add( cube3 )
const cube3V = new THREE.Vector3(0,1,0)
intervalActions.push(()=>{
    cube3.rotateOnAxis(cube3V, 0.001)
    const time = performance.now() * 0.001
	cube3.position.y = Math.sin( time )/3 - 0.4
})

const geometry4 = new THREE.BoxGeometry( 1, 1, 1 )
const material4 = new THREE.MeshLambertMaterial( { color: 0xD1BA74 } )
const cube4 = new THREE.Mesh( geometry4, material4 )
cube4.position.set(6,0.1,10)
cube4.castShadow = true
scene.add( cube4 )

createTable(scene,{x:5,y:-0.4,z:15})
const updateText = createComputer(scene,{x:5,y:1.3,z:14.6})
createKeyboard(scene, animateActions, {x:5,y:1.3,z:15.4})

gameTypingDxerciseBegin(scene,camera,intervalActions,updateText)

// const geometry3 = new THREE.SphereGeometry(1)
// const material3 = new THREE.MeshLambertMaterial( {//MeshBasicMaterial
//     color: 0x404040,
//     transparent:true,//允许透明
//     opacity:0.5,//透明程度 
// })
// const cube3 = new THREE.Mesh( geometry3, material3 )
// cube3.position.x= 0
// cube3.position.y= 0
// cube3.position.z= 0
// scene.add( cube3 )

// const moonLight = new THREE.PointLight(0x404040)
// moonLight.position.set(0,0,0)
// // moonLight.visible = true
// moonLight.decay = 0 //不随距离衰减
// moonLight.intensity = 100 //光照强度
// moonLight.distance = 200 //作用距离
// scene.add(moonLight)


// const loader = new GLTFLoader();
// loader.load(`/3DModel/moon.glb`, moon => {
//     const cubeMoon = moon.scene
//     cubeMoon.scale.set(4,4,4) // 定义导入物体大小
//     cubeMoon.position.x= 2

//     // const moonMesh = new THREE.Mesh(cubeMoon)
//     const moonLight = new THREE.PointLight(0x404040)
//     moonLight.position.set(cubeMoon.position.x,cubeMoon.position.y,cubeMoon.position.z+4.0001)
//     // moonLight.visible = true
//     moonLight.decay = 0 //不随距离衰减
//     moonLight.intensity = 100 //光照强度
//     moonLight.distance = 20 //作用距离
//     scene.add(cubeMoon)
//     scene.add(moonLight)

//     // const box3 = new THREE.Box3()
// 	// box3.expandByObject(moon.scene)
// 	// const v3 = new THREE.Vector3()
// 	// box3.getSize(v3)
// 	// console.log('size', v3)

// }, undefined, error => {
//     console.error(error)
// })

// const loader = new GLTFLoader();
// loader.load(`/3DModel/summer_house.glb`, house => {
//     const cubeMoon = house.scene
//     // cubeMoon.scale.set(200,200,200) // 定义导入物体大小
//     cubeMoon.position.x= 0
//     cubeMoon.position.y= 0
//     cubeMoon.position.z= 50

//     scene.add(cubeMoon)
// }, undefined, error => {
//     console.error(error)
// })




//初始化功能
initStats({animateActions}) //性能检测图标工具
initIntersect({animateActions,objects: [cube,cube2,cube3],camera}) //通过鼠标移动到屏幕，显示选中的mesh物体
initFirstPersonControls({camera,intervalActions}) // 控制器

//init初始化场景
initSky(renderer,animateActions,intervalActions,scene,camera) //天空
initWater({animateActions,scene}) //水

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
    return <Fragment/>
}

export { SceneWindow }