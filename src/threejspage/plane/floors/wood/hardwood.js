import * as THREE from 'three'

const floorMat = new THREE.MeshStandardMaterial( {
    roughness: 0.8,
    color: 0xffffff,
    metalness: 0.2,
    bumpScale: 1
} )
const textureLoader = new THREE.TextureLoader()
textureLoader.load( require('./hardwood2_diffuse.jpg'),  map => {
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.anisotropy = 4
    map.repeat.set( 10, 24 )
    map.colorSpace = THREE.SRGBColorSpace
    floorMat.map = map
    floorMat.needsUpdate = true
} )
textureLoader.load( require('./hardwood2_bump.jpg'), map => {
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.anisotropy = 4
    map.repeat.set( 10, 24 )
    floorMat.bumpMap = map
    floorMat.needsUpdate = true
} )
textureLoader.load( require('./hardwood2_roughness.jpg'), map => {
    map.wrapS = THREE.RepeatWrapping
    map.wrapT = THREE.RepeatWrapping
    map.anisotropy = 4
    map.repeat.set( 10, 24 )
    floorMat.roughnessMap = map
    floorMat.needsUpdate = true
} )



class HardWood {

    constructor (option) {
        const {animateActions,scene} = option

        const floorGeometry = new THREE.PlaneGeometry( 40, 40 )
        const floorMesh = new THREE.Mesh( floorGeometry, floorMat )
        floorMesh.receiveShadow = true
        floorMesh.rotation.x = - Math.PI / 2.0
        floorMesh.position.set(-5,-0.4,30)
        scene.add( floorMesh )


        animateActions.push(()=>{
            // console.log(floorMesh.position)
        })

    }

}


export default HardWood