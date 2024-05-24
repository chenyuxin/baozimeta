/**
 * 键盘鼠标事件监听
 * @returns 
 */
class KeyListener {

    mouseX = 0
    mouseY = 0
    isKeyDown = new Set()

    /**
     * 验证按钮是否被按下
     * 传入keyCode,多个按键用+号分隔
     * @param {String} KeyCodes
     * @returns boolean 
     */
    isPushing = (keyCodes) => {
        const pushingKeys = keyCodes.split('+')
        if (pushingKeys) {
            pushingKeys.forEach(pushingKey => {
                if (!this.isKeyDown.has(pushingKey)) {
                    return false
                }
            })
            return true
        } else {
            return false
        } 
    }

    /**
     * 传入listener函数用于虚拟dom的状态更新
     * @param {Function} listener 
     */
    constructor(listener){
        /**
         * 鼠标事件监听
         */
        window.addEventListener('mousemove', e => {
            listener?.mousemove(e.clientX-this.mouseX,e.clientYY-this.mouseY)
            this.mouseX = e.clientX
            this.mouseY = e.clientY
            // if (this.isKeyDown.size>0) {   
            //     console.log(`x:${this.mouseX}, y:${this.mouseY}`)
            //     console.log(this.isKeyDown)
            // }
        })

        window.addEventListener('mouseup', e => {
            // console.log('button:', e.button, 'e:', e)
            const mouseCode = `M${e.button}`
            this.isKeyDown.delete(mouseCode)
            listener?.isKeyDown(this.isKeyDown,mouseCode)
        })

        window.addEventListener('mousedown', e => {
            const mouseCode = `M${e.button}`
            this.isKeyDown.add(mouseCode)
            listener?.isKeyDown(this.isKeyDown,mouseCode)
            //console.log(this.mouseX,this.mouseY)
            // if(this.isKeyDown.size>0) {
            //     console.log('button:', e.button,'isKeyDown:', this.isKeyDown,'e:', e)
            // }
        })

        window.addEventListener('wheel', e => {
            // console.log('wheel:', e, 'deltaX:', e.deltaX, 'deltaY:', e.deltaY)
            listener?.isMouseWheel(e.deltaX,e.deltaY)
        })

        /**
         * 键盘事件监听
         */
        window.addEventListener('keydown', e => {
            //debugger
            this.isKeyDown.add(e.code)
            listener?.isKeyDown(this.isKeyDown,e.code)
            // if(this.isKeyDown.size>0) {
            //     console.log('button:', e.button,'isKeyDown:', this.isKeyDown,'e:', e)
            // }
        })

        window.addEventListener('keyup', e => {
            //console.log('button:', e.button, 'e:', e)
            this.isKeyDown.delete(e.code)
            listener?.isKeyDown(this.isKeyDown,e.code)
        })            

        /**
         * 控制器事件监听
         */
        window.addEventListener('gamepadButton', e => {
            //console.log('gamepad:', e.code);
        })

        window.addEventListener('click', e => {
            // this.gamepad = navigator.getGamepads()[0]
            //console.log(navigator.getGamepads())
        })

        // this.controlTimer = setInterval(() => {
        //     this.gamepad = navigator.getGamepads()[0]
        //     console.log(navigator.getGamepads())
        // }, 100)

        window.addEventListener('blur', e => {
            this.isKeyDown.clear()
        })
        

    }
   
}

const keyListener = new KeyListener()

export default keyListener
