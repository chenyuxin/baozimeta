/**
 * 键盘鼠标事件监听
 * @returns 
 */
class KeyListener {

    mouseX = 0
    mouseY = 0
    isKeyDown = new Set()
    eventTarget = new EventTarget() //事件器，用于外部监听


    static mousemove = 'mousemove' //鼠标移动事件
    static mouseup = 'mouseup' //鼠标按键抬起事件
    static mousedown = 'mousedown' //鼠标按下事件
    static wheel = 'wheel' //鼠标滚轮事件
    static keydown = 'keydown' //键盘按下事件
    static keyup = 'keyup' //键盘抬起事件

    /**
     * 验证按钮是否被按下
     * 传入keyCode,多个按键用+号分隔
     * @param {String} KeyCodes
     * @returns boolean 
     */
    isPushing = (keyCodes) => {
        const pushingKeys = keyCodes.split('+')
        let hasPushingKeys = true
        if (pushingKeys) {
            pushingKeys.forEach(pushingKey => {
                if (!this.isKeyDown.has(pushingKey)) {
                    hasPushingKeys = false
                }
            })
        } else {
            hasPushingKeys = false
        } 
        return hasPushingKeys
    }

    /**
     * 传入listener函数用于虚拟dom的状态更新
     */
    constructor(){
        /**
         * 鼠标事件监听
         */
        window.addEventListener(KeyListener.mousemove, e => {
            //listener?.mousemove(e.clientX-this.mouseX,e.clientYY-this.mouseY)
            this.mouseX = e.clientX
            this.mouseY = e.clientY
            // if (this.isKeyDown.size>0) {   
            //     console.log(`x:${this.mouseX}, y:${this.mouseY}`)
            //     console.log(this.isKeyDown)
            // }
        })

        window.addEventListener(KeyListener.mouseup, e => {
            // console.log('button:', e.button, 'e:', e)
            const mouseCode = `M${e.button}`
            this.isKeyDown.delete(mouseCode)
        })

        window.addEventListener(KeyListener.mousedown, e => {
            const mouseCode = `M${e.button}`
            this.isKeyDown.add(mouseCode)
            //console.log(this.mouseX,this.mouseY)
            // if(this.isKeyDown.size>0) {
            //     console.log('button:', e.button,'isKeyDown:', this.isKeyDown,'e:', e)
            // }
        })

        window.addEventListener(KeyListener.wheel, e => {
            //console.log('wheel:', e, 'deltaX:', e.deltaX, 'deltaY:', e.deltaY)
            //listener?.isMouseWheel(e.deltaX,e.deltaY)
        })

        /**
         * 键盘事件监听
         */
        window.addEventListener(KeyListener.keydown, e => {
            this.isKeyDown.add(e.code)
            this.handKeyChange(KeyListener.keydown)
        })

        window.addEventListener(KeyListener.keyup, e => {
            this.isKeyDown.delete(e.code)
            this.handKeyChange(KeyListener.keyup)
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

    /**
     * 按键变化拦截，提供给外部监听
     */
    handKeyChange(eventType) {
        this.eventTarget.dispatchEvent(new CustomEvent(eventType,{detail: eventType}))
    }
   
}

const keyListener = new KeyListener()

export default keyListener
