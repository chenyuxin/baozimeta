
import * as THREE from 'three'

// import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

import { Sky } from 'three/addons/objects/Sky.js'
import { nor0 } from '../../util/math/mathfunction'

const sky = new Sky()
sky.scale.setScalar( 450000 )

const sun = new THREE.Vector3()
const sunlight = new THREE.DirectionalLight(0x404040) //颜色 光照强度
sunlight.visible = true //可见
sunlight.decay = 0 //不随距离衰减
sunlight.intensity = 100 //光照强度
sunlight.distance = 600000 //作用距离

// sunlight.shadow.radius = 3 // 阴影边界的模糊化
sunlight.castShadow = true //照射出阴影
sunlight.shadow.mapSize.width = 2048 //阴影的像素
sunlight.shadow.mapSize.height = 2048
// 方向光投影近点、远点更新
sunlight.shadow.camera.near = 0.1
sunlight.shadow.camera.far = 50000
// 方向光投影边界更新
sunlight.shadow.camera.left = -100
sunlight.shadow.camera.right = 100
sunlight.shadow.camera.top = 100
sunlight.shadow.camera.bottom = -100

const hemilight = new THREE.HemisphereLight(0x404040,0x404040,5) //球面环境光，模拟散射
hemilight.decay = 0 //不随距离衰减
hemilight.intensity = 10 //光照强度
const ambientLight = new THREE.AmbientLight( 0x404040 ) // 柔和的白光环境光

// const pmremGenerator = new THREE.PMREMGenerator( renderer )
// const sceneEnv = new THREE.Scene()
// let renderTarget
// const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation )
// const theta = THREE.MathUtils.degToRad( parameters.azimuth )
// sun.setFromSphericalCoords( 1, phi, theta )
// sky.material.uniforms[ 'sunPosition' ].value.copy( sun )
// water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize()
// if ( renderTarget !== undefined ) renderTarget.dispose()
// sceneEnv.add( sky )
// renderTarget = pmremGenerator.fromScene( sceneEnv )
// scene.add( sky )
// scene.environment = renderTarget.texture

const initSky = (renderer,animateActions,intervalActions,scene,camera) => {
    scene.add(sky)

    // renderer.setPixelRatio( window.devicePixelRatio )
    //renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping //电影滤镜
    // renderer.toneMappingExposure = 0.8 //整个渲染曝光度
    

    /// GUI
    const effectController = {
        turbidity: 2, //10
        rayleigh: 1, //3
        mieCoefficient: 0.005, // 0.005
        mieDirectionalG: 0.8,
        elevation: -4.1,
        azimuth: -150,
        exposure: renderer.toneMappingExposure
    }
    sky.material.uniforms[ 'turbidity' ].value = effectController.turbidity
    sky.material.uniforms[ 'rayleigh' ].value = effectController.rayleigh
    sky.material.uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient
    sky.material.uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG
    const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation )
    const theta = THREE.MathUtils.degToRad( effectController.azimuth )
    sun.setFromSphericalCoords( 1, phi, theta )
    sky.material.uniforms[ 'sunPosition' ].value.copy( sun )

    let sunLightPosition = camera.position.clone().add( sun.clone().multiplyScalar(400000))
    sunlight.position.copy(sunLightPosition)
    sunlight.target.position.copy(camera.position)
    scene.add(sunlight)
    scene.add(sunlight.target)
    hemilight.position.copy(camera.position)
    scene.add(hemilight)
    scene.add( ambientLight )
    // console.log('sunlight.position:', sunlight.position, 'sunlight.target.position:', sunlight.target.position )
    
    let isUp = true//模拟太阳升起和下落的变化
    const changeSunPosition = (variable) => {
        if (effectController.elevation > 50) {//50度最高
            isUp = false
        } else if (effectController.elevation < -6) {
            isUp = true
        }
        isUp? effectController.elevation += variable : effectController.elevation -= variable
        return effectController.elevation
    }
    intervalActions.push(() => {//给定一个变量让太阳升起和落下
        let elevation = changeSunPosition(0.001) //高度 移动系数 0.001
        if (elevation < -0.6) {
            sunlight.visible = false//不可见
            renderer.toneMappingExposure = 0.5 // 调整曝光度
        } 
        if (elevation < -3) {
            hemilight.visible = false
            renderer.toneMappingExposure = 0.4
        }
        if (elevation < -4) {
            ambientLight.visible = false
            renderer.toneMappingExposure = 0.3
        }
        
        if (elevation > -3) {
            ambientLight.visible = true//开启可见
            renderer.toneMappingExposure = 0.4
        }
        if (elevation > -2) {
            hemilight.visible = true
            renderer.toneMappingExposure = 0.6
        }
        if (elevation > -0.4) {
            sunlight.visible = true 
            renderer.toneMappingExposure = 0.8
        }
        // console.log('renderer.toneMappingExposure:', renderer.toneMappingExposure)
        const rayleighX = nor0(elevation, 2, 1)//正态分布 瑞丽值在参数二 2度的时候最大
        effectController.rayleigh = rayleighX*2.5+0.5
        effectController.turbidity = rayleighX*20+1
        
        const phi = THREE.MathUtils.degToRad( 90 -  elevation)
        let azimuth = effectController.azimuth -= 0.003 //水平移动度数
        const theta = THREE.MathUtils.degToRad( azimuth )
        sun.setFromSphericalCoords( 0.1, phi, theta )
        sky.material.uniforms[ 'sunPosition' ].value.copy( sun )

        sunlight.position.copy(camera.position.clone().add(sun.clone().multiplyScalar(400000))) //阳光发出位置，根据太阳位置决定
        sunlight.target.position.copy(camera.position) // 阳光照射对准摄像机所在位置
        hemilight.position.copy(camera.position) //半球光
        sky.position.copy(camera.position) //天空永远跟随相机走

    })

}

export default initSky