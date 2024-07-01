import Stats from 'three/addons/libs/stats.module.js'

const stats = new Stats()//性能检测工具
stats.dom.style.left = '50px'
document.body.appendChild( stats.dom )

/**
 * 性能检测工具初始化
 * @param {*} option 
 */
const initStats = (option) => {
    const {animateActions} = option

    animateActions.push(()=>{//加入每帧渲染
        stats.update() //性能检测图标工具
    })
}

export default initStats