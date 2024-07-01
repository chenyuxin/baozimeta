
/**
 * 正态分布公式
 * @param {Number} x x值
 * @param {Number} phi 平均值在0时
 * @param {Number} theta 方差系数
 * @return y值
 */
const nor0 = (x,phi,theta) => {
    const exp = Math.exp( 0 - Math.pow( x-phi, 2) / (Math.pow(theta,2) * 2) )
    return 1/(theta*Math.sqrt(2*Math.PI)) * exp
}

/**
 * 正态分布公式
 * @param {Number} x x值
 * @param {Number} theta 方差系数
 * @return y值
 */
const nor = (x,theta) => {
    const exp = Math.exp( 0 - Math.pow( x, 2) / (Math.pow(theta,2) * 2) )
    return 1/(theta*Math.sqrt(2*Math.PI)) * exp
}

// const xi = 1
// const mu = 20
// console.log(nor0(-6,2,xi)*mu+1)
// console.log(nor0(-5,2,xi)*mu+1)
// console.log(nor0(-4,2,xi)*mu+1)
// console.log(nor0(-3,2,xi)*mu+1)
// console.log(nor0(-2,2,xi)*mu+1)
// console.log(nor0(-1,2,xi)*mu+1)
// console.log(nor0(0,2,xi)*mu+1)
// console.log(nor0(1,2,xi)*mu+1)
// console.log(nor0(2,2,xi)*mu+1)
// console.log(nor0(3,2,xi)*mu+1)
// console.log(nor0(4,2,xi)*mu+1)
// console.log(nor0(5,2,xi)*mu+1)
// console.log(nor0(6,2,xi)*mu+1)

export { nor0 , nor }