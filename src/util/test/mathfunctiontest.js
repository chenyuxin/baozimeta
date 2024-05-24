import { nor0 } from "../math/mathfunction"

console.log(Math.PI)
console.log(Math.E)
console.log(1/Math.sqrt(4))

console.log(1/Math.sqrt(2*1*Math.PI) * Math.E)
console.log(Math.pow(3,2))


const f = (x) => {
    const pow = 0 - Math.pow( x, 2) / (Math.pow(0.6,2) * 2)
    return Math.pow( 1/(0.6*Math.sqrt(2*Math.PI)) * Math.E , pow)
}


