import * as THREE from 'three'

import { Water } from 'three/addons/objects/Water.js'


// Water
const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 )

const initWater = (option) => {
    const {animateActions,scene} = option

    const waterNormals = new THREE.TextureLoader().load( require('./texturemap/waternormals.jpg') , texture => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    })
    const water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 0.7,
            fog: scene.fog !== undefined
        }
    )

    water.rotation.x = - Math.PI / 2 // 水面平放
    water.position.y = -0.5 //放低0.5米
	scene.add( water )

    console.log(water)

    // const time = performance.now() * 0.001
        
    // const gui = new GUI()
    // const folderWater = gui.addFolder( 'Water' )
    // folderWater.add( waterUniforms.distortionScale, 'value', 0, 8, 0.1 ).name( 'distortionScale' )
    // folderWater.add( waterUniforms.size, 'value', 0.1, 10, 0.1 ).name( 'size' )
    // folderWater.open()


    // water.material.uniforms[ 'sunDirection' ].value.copy( new THREE.Vector3(1,1,1) ).normalize()
    water.material.uniforms.size.value = 0.4

    animateActions.push(()=>{
        water.material.uniforms[ 'time' ].value += 0.2 / 60.0
    })

}

export default initWater
