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
     * @param {String || Array} KeyCodes 
     * @returns boolean 
     */
    isPushing = (keyCodes=[]) => {
        keyCodes =  keyCodes instanceof Array ? keyCodes : keyCodes.split('+')
        return keyCodes.every(key => this.isKeyDown.has(key))
    }

    /**
     * 传入listener函数用于虚拟dom的状态更新
     */
    constructor(){
        /**
         * 鼠标事件监听
         */
        window.addEventListener(KeyListener.mousemove, e => {
            this.mouseX = e.clientX
            this.mouseY = e.clientY
            // if (this.isKeyDown.size>0) {   
            //     console.log(`x:${this.mouseX}, y:${this.mouseY}`)
            //     console.log(this.isKeyDown)
            // }
        }, { passive: true }) //对于不需要调用 preventDefault() 的事件,启用被动监听以提高滚动和触摸事件的性能

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
        }, { passive: true }) //对于不需要调用 preventDefault() 的事件,启用被动监听以提高滚动和触摸事件的性能

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
     * private <br>
     * 按键变化拦截，提供给外部监听
     */
    handKeyChange = eventType => {
        this.eventTarget.dispatchEvent(new CustomEvent(eventType,{detail: eventType}))
    }
   
}

const KeyCodes = {
    Esc: 'Escape', F1: 'F1', F2: 'F2', F3: 'F3', F4: 'F4', F5: 'F5', F6: 'F6', F7: 'F7', F8: 'F8', F9: 'F9', F10: 'F10', F11: 'F11', F12: 'F12', Ins: 'Insert', Del: 'Delete',
    Backquote: 'Backquote', 1: 'Digit1', 2: 'Digit2', 3: 'Digit3', 4: 'Digit4', 5: 'Digit5', 6: 'Digit6', 7: 'Digit7', 8: 'Digit8', 9: 'Digit9', 0: 'Digit0', Minus: 'Minus', Equal: 'Equal', Backspace: 'Backspace',
    A: 'KeyA', B: 'KeyB', C: 'KeyC', D: 'KeyD', E: 'KeyE', F: 'KeyF', G: 'KeyG', H: 'KeyH', I: 'KeyI',
    J: 'KeyJ', K: 'KeyK', L: 'KeyL', M: 'KeyM', N: 'KeyN', O: 'KeyO', P: 'KeyP', Q: 'KeyQ', R: 'KeyR',
    S: 'KeyS', T: 'KeyT', U: 'KeyU', V: 'KeyV', W: 'KeyW', X: 'KeyX', Y: 'KeyY', Z: 'KeyZ',
    Tab: 'Tab', BracketLeft: 'BracketLeft', BracketRight: 'BracketRight', Backslash: 'Backslash',
    CapsLock: 'CapsLock',/** ; */ Semicolon: 'Semicolon', /** ' */ Quote: 'Quote', Enter: 'Enter', 
    ShiftLeft: 'ShiftLeft',/** , */ Comma: 'Comma',/** . */ Period: 'Period', /** / */ Slash: 'Slash', ShiftRight: 'ShiftRight', 
    CtrlLeft: 'ControlLeft', MetaLeft: 'MetaLeft', AltLeft: 'AltLeft', Space: 'Space', AltRight: 'AltRight', CtrlRight: 'ControlRight', 
    Left: 'ArrowLeft', Up: 'ArrowUp', Down: 'ArrowDown', Right: 'ArrowRight',
    Home: 'Home', End: 'End', PageUp: 'PageUp', PageDown: 'PageDown', 
    NumLock: 'NumLock', NumpadDivide: 'NumpadDivide', NumpadMultiply: 'NumpadMultiply', NumpadSubtract: 'NumpadSubtract',
    NumpadAdd: 'NumpadAdd', NumpadEnter: 'NumpadEnter', NumpadDecimal: 'NumpadDecimal', 
    Numpad0: 'Numpad0', Numpad1: 'Numpad1', Numpad2: 'Numpad2', Numpad3: 'Numpad3', Numpad4: 'Numpad4', Numpad5: 'Numpad5', Numpad6: 'Numpad6', Numpad7: 'Numpad7', Numpad8: 'Numpad8', Numpad9: 'Numpad9',

}

const keyListener = new KeyListener()

export default keyListener
export {KeyListener, KeyCodes}